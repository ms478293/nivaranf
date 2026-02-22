#!/usr/bin/env python3
"""Global_News hourly pipeline for OpenClaw.

Flow:
1) Pull global health/education stories from trusted RSS feeds.
2) Keep only trusted/verified, non-Nepal candidates related to health or education.
3) Remove duplicates against prior runs + existing global posts, then pick top ranked #1.
4) Apply adaptive quality threshold to keep hourly output steady; fallback only when needed.
5) Generate long-form paraphrased article + image prompt via Gemini.
6) Prefer source image with attribution; fallback to Gemini image model.
7) Publish using scripts/publish-article.mjs (same site template pipeline).
"""

from __future__ import annotations

import argparse
import base64
import datetime as dt
import email.utils
import html
import hashlib
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

try:
    from PIL import Image, ImageFilter, ImageStat
except Exception:
    Image = None
    ImageFilter = None
    ImageStat = None

USER_AGENT = "Mozilla/5.0 (compatible; NivaranGlobalNewsBot/1.0)"
GEMINI_TEXT_MODEL_DEFAULT = "gemini-pro-latest"
GEMINI_IMAGE_MODEL_DEFAULT = "gemini-2.0-flash-exp-image-generation"
DEFAULT_TIMEOUT_SECONDS = 60
TARGET_IMAGE_LONG_EDGE = 7680
IMAGE_QUALITY_SUFFIX = (
    "Documentary realism, sharp focus, high local contrast, crisp texture detail, "
    "natural color science, no blur, no haze, no fog, no watercolor, no CGI."
)
SOURCE_IMAGE_MIN_LONG_EDGE = 1400
PARAPHRASE_SHINGLE_SIZE = 10
PARAPHRASE_MAX_SHINGLE_OVERLAP = 0.04
PARAPHRASE_MAX_EXACT_RUN_WORDS = 14
DUPLICATE_FALLBACK_MIN_SCORE = 52

HEALTH_TERMS = {
    "health",
    "public health",
    "vaccine",
    "vaccination",
    "hospital",
    "clinic",
    "outbreak",
    "disease",
    "mortality",
    "maternal",
    "child health",
    "nutrition",
    "mental health",
    "epidemic",
}

EDUCATION_TERMS = {
    "education",
    "school",
    "teacher",
    "students",
    "learning",
    "literacy",
    "curriculum",
    "classroom",
    "university",
}

IMPACT_TERMS = {
    "crisis",
    "emergency",
    "alert",
    "reform",
    "policy",
    "funding",
    "shortage",
    "warning",
    "report",
    "study",
    "who",
    "unicef",
    "unesco",
}

GLOBAL_TERMS = {
    "global",
    "world",
    "international",
    "across countries",
    "multinational",
    "cross-border",
}

BLOCK_TERMS = {
    "advertorial",
    "sponsored",
    "opinion",
    "op-ed",
    "podcast",
    "video",
}


@dataclass
class Candidate:
    title: str
    link: str
    summary: str
    published_at: Optional[dt.datetime]
    domain: str
    score: float
    health_hits: int
    education_hits: int
    reason: str


def now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def floor_hour(ts: dt.datetime) -> dt.datetime:
    return ts.replace(minute=0, second=0, microsecond=0)


def normalize_ws(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def strip_html(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return normalize_ws(value)


def strip_html_to_text(value: str) -> str:
    text = value or ""
    text = re.sub(r"(?is)<script[^>]*>.*?</script>", " ", text)
    text = re.sub(r"(?is)<style[^>]*>.*?</style>", " ", text)
    text = re.sub(r"(?is)<noscript[^>]*>.*?</noscript>", " ", text)
    text = re.sub(r"(?is)<[^>]+>", " ", text)
    text = html.unescape(text)
    return normalize_ws(text)


def normalize_for_similarity(value: str) -> str:
    low = value.lower()
    low = re.sub(r"[^a-z0-9\s]", " ", low)
    return normalize_ws(low)


def shingle_set(words: List[str], size: int) -> set[str]:
    if len(words) < size:
        return set()
    return {" ".join(words[i : i + size]) for i in range(len(words) - size + 1)}


def longest_exact_run_words(a_words: List[str], b_words: List[str]) -> int:
    index: Dict[str, List[int]] = {}
    for i, token in enumerate(b_words):
        index.setdefault(token, []).append(i)

    best = 0
    for i, token in enumerate(a_words):
        for j in index.get(token, []):
            run = 0
            while (
                i + run < len(a_words)
                and j + run < len(b_words)
                and a_words[i + run] == b_words[j + run]
            ):
                run += 1
            if run > best:
                best = run
    return best


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value[:80] if len(value) > 80 else value


def req_json(
    url: str, payload: Dict, timeout: int = DEFAULT_TIMEOUT_SECONDS, retries: int = 2
) -> Dict:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
        },
    )
    last_error: Optional[Exception] = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                data = response.read().decode("utf-8", errors="ignore")
                return json.loads(data)
        except Exception as exc:
            last_error = exc
            if attempt >= retries:
                break
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"JSON request failed: {last_error}")


def req_text(url: str, timeout: int = DEFAULT_TIMEOUT_SECONDS, retries: int = 2) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    last_error: Optional[Exception] = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return response.read().decode("utf-8", errors="ignore")
        except Exception as exc:
            last_error = exc
            if attempt >= retries:
                break
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"Text request failed: {last_error}")


def req_bytes(
    url: str, timeout: int = DEFAULT_TIMEOUT_SECONDS, retries: int = 2
) -> Tuple[bytes, str]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "image/avif,image/webp,image/*,*/*;q=0.8",
        },
    )
    last_error: Optional[Exception] = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                content_type = (response.headers.get("Content-Type") or "").lower()
                mime = content_type.split(";")[0].strip() if content_type else ""
                return response.read(), mime
        except Exception as exc:
            last_error = exc
            if attempt >= retries:
                break
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"Binary request failed: {last_error}")


def parse_datetime(raw: str) -> Optional[dt.datetime]:
    if not raw:
        return None
    try:
        parsed = email.utils.parsedate_to_datetime(raw)
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=dt.timezone.utc)
        return parsed.astimezone(dt.timezone.utc)
    except Exception:
        pass

    for fmt in ("%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%d"):
        try:
            parsed = dt.datetime.strptime(raw, fmt)
            if parsed.tzinfo is None:
                parsed = parsed.replace(tzinfo=dt.timezone.utc)
            return parsed.astimezone(dt.timezone.utc)
        except Exception:
            continue
    return None


def parse_feed_items(xml_text: str) -> List[Tuple[str, str, str, str]]:
    items: List[Tuple[str, str, str, str]] = []
    root = ET.fromstring(xml_text)

    for item in root.findall(".//item"):
        title = normalize_ws("".join(item.findtext("title", default="") or ""))
        link = normalize_ws(item.findtext("link", default="") or "")
        description = strip_html(item.findtext("description", default="") or "")
        pub = normalize_ws(item.findtext("pubDate", default="") or "")
        if title and link:
            items.append((title, link, description, pub))

    atom_ns = "{http://www.w3.org/2005/Atom}"
    for entry in root.findall(f".//{atom_ns}entry"):
        title = normalize_ws(entry.findtext(f"{atom_ns}title", default="") or "")
        link = ""
        for link_node in entry.findall(f"{atom_ns}link"):
            href = (link_node.attrib.get("href") or "").strip()
            rel = (link_node.attrib.get("rel") or "").strip()
            if href and (not rel or rel == "alternate"):
                link = href
                break
        summary = strip_html(entry.findtext(f"{atom_ns}summary", default="") or "")
        if not summary:
            summary = strip_html(entry.findtext(f"{atom_ns}content", default="") or "")
        pub = normalize_ws(entry.findtext(f"{atom_ns}updated", default="") or "")
        if title and link:
            items.append((title, link, summary, pub))

    return items


def load_json(path: Path, fallback: Dict) -> Dict:
    if not path.exists():
        return fallback
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def save_json(path: Path, value: Dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding="utf-8")


def domain_of(url: str) -> str:
    host = urllib.parse.urlparse(url).netloc.lower().strip()
    return host[4:] if host.startswith("www.") else host


def canonicalize_url(url: str) -> str:
    raw = (url or "").strip()
    if not raw:
        return ""
    parsed = urllib.parse.urlparse(raw)
    if not parsed.scheme or not parsed.netloc:
        return raw
    path = re.sub(r"/{2,}", "/", parsed.path or "/").rstrip("/") or "/"
    return urllib.parse.urlunparse(
        (parsed.scheme.lower(), parsed.netloc.lower(), path, "", "", "")
    )


def extract_existing_content_fingerprints(repo_root: Path) -> Tuple[set[str], set[str]]:
    source_links: set[str] = set()
    title_keys: set[str] = set()
    global_dir = repo_root / "src" / "blogs" / "global"
    if not global_dir.exists():
        return source_links, title_keys

    for mdx_file in global_dir.glob("*.mdx"):
        try:
            text = mdx_file.read_text(encoding="utf-8")
        except Exception:
            continue

        frontmatter_match = re.match(r"(?s)^---\n(.*?)\n---\n", text)
        frontmatter = frontmatter_match.group(1) if frontmatter_match else ""
        title_match = re.search(
            r"(?m)^title:\s*[\"']?(.+?)[\"']?\s*$", frontmatter
        )
        if title_match:
            title_key = slugify(normalize_ws(title_match.group(1)))
            if title_key:
                title_keys.add(title_key)

        for raw_url in re.findall(r"https?://[^\s)\"'>]+", text):
            normalized = canonicalize_url(raw_url)
            if normalized:
                source_links.add(normalized)

    return source_links, title_keys


def is_trusted_domain(domain: str, trusted_domains: List[str]) -> bool:
    for trusted in trusted_domains:
        trusted = trusted.lower().strip()
        if not trusted:
            continue
        if domain == trusted or domain.endswith("." + trusted):
            return True
    return False


def trusted_domain_score(domain: str, trusted_domains: List[str]) -> int:
    if is_trusted_domain(domain, trusted_domains):
        return 35
    if domain.endswith(".gov") or domain.endswith(".edu"):
        return 26
    if domain.endswith(".org"):
        return 15
    return 8


def contains_blocked_term(text: str) -> bool:
    low = text.lower()
    return any(term in low for term in BLOCK_TERMS)


def text_hits(text: str, terms: set[str]) -> int:
    low = text.lower()
    return sum(1 for t in terms if t in low)


def build_candidate(
    title: str,
    link: str,
    summary: str,
    pub_raw: str,
    trusted_domains: List[str],
    exclude_terms: List[str],
) -> Optional[Candidate]:
    merged_text = f"{title} {summary}".lower()
    if any(term.lower() in merged_text for term in exclude_terms):
        return None
    if contains_blocked_term(merged_text):
        return None

    domain = domain_of(link)
    # Enforce user rule: only trusted and verified sources.
    if not is_trusted_domain(domain, trusted_domains):
        return None

    health_hits = text_hits(merged_text, HEALTH_TERMS)
    education_hits = text_hits(merged_text, EDUCATION_TERMS)
    if health_hits == 0 and education_hits == 0:
        return None

    impact_hits = text_hits(merged_text, IMPACT_TERMS)
    global_hits = text_hits(merged_text, GLOBAL_TERMS)
    credibility = trusted_domain_score(domain, trusted_domains)
    published_at = parse_datetime(pub_raw)

    freshness = 0
    if published_at:
        age_hours = (now_utc() - published_at).total_seconds() / 3600
        if age_hours <= 24:
            freshness = 18
        elif age_hours <= 72:
            freshness = 10
        elif age_hours <= 168:
            freshness = 4

    relevance = 12 + (health_hits * 5) + (education_hits * 5)
    if health_hits > 0 and education_hits > 0:
        relevance += 6
    relevance += impact_hits * 2
    relevance += min(global_hits * 2, 6)

    score = relevance + credibility + freshness
    reason = (
        f"relevance={relevance}, credibility={credibility}, freshness={freshness}, "
        f"health_hits={health_hits}, education_hits={education_hits}, global_hits={global_hits}"
    )

    return Candidate(
        title=title,
        link=link,
        summary=summary,
        published_at=published_at,
        domain=domain,
        score=score,
        health_hits=health_hits,
        education_hits=education_hits,
        reason=reason,
    )


def extract_source_image_urls(page_html: str, page_url: str) -> List[str]:
    candidates: List[str] = []

    meta_patterns = [
        r'<meta[^>]+property=["\']og:image(?::secure_url)?["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']twitter:image(?::src)?["\'][^>]+content=["\']([^"\']+)["\']',
        r'data-image=["\']([^"\']+)["\']',
    ]
    for pattern in meta_patterns:
        for match in re.findall(pattern, page_html, flags=re.IGNORECASE):
            raw = html.unescape(match).strip()
            if raw:
                candidates.append(urllib.parse.urljoin(page_url, raw))

    script_match = re.search(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>',
        page_html,
        flags=re.IGNORECASE,
    )
    if script_match:
        script_text = html.unescape(script_match.group(1))
        json_image_patterns = [
            r'"image"\s*:\s*"([^"]+)"',
            r'"image"\s*:\s*\{[^}]*"url"\s*:\s*"([^"]+)"',
        ]
        for pattern in json_image_patterns:
            for match in re.findall(pattern, script_text, flags=re.IGNORECASE):
                raw = match.replace("\\/", "/").strip()
                if raw:
                    candidates.append(urllib.parse.urljoin(page_url, raw))

    unique_urls: List[str] = []
    seen: set[str] = set()
    for raw_url in candidates:
        parsed = urllib.parse.urlparse(raw_url)
        if parsed.scheme not in ("http", "https"):
            continue
        normalized = parsed._replace(fragment="").geturl()
        if normalized in seen:
            continue
        seen.add(normalized)
        unique_urls.append(normalized)
    return unique_urls


def try_fetch_source_image(article_url: str) -> Optional[Tuple[bytes, str, str]]:
    try:
        page_html = req_text(article_url, timeout=30, retries=1)
    except Exception:
        return None

    image_urls = extract_source_image_urls(page_html, article_url)
    if not image_urls:
        return None

    for image_url in image_urls:
        try:
            data, mime = req_bytes(image_url, timeout=40, retries=1)
        except Exception:
            continue
        if not data:
            continue

        if Image is not None:
            try:
                with Image.open(io.BytesIO(data)) as img:
                    if max(img.size) < SOURCE_IMAGE_MIN_LONG_EDGE:
                        continue
            except Exception:
                continue
        return data, (mime or "image/jpeg"), image_url
    return None


def fetch_source_article_text(article_url: str) -> str:
    try:
        page_html = req_text(article_url, timeout=40, retries=1)
    except Exception:
        return ""
    text = strip_html_to_text(page_html)
    # Keep a bounded buffer for comparison to avoid giant pages.
    words = text.split()
    if len(words) > 8000:
        words = words[:8000]
    return " ".join(words)


def check_paraphrase_quality(source_text: str, generated_markdown: str) -> Tuple[bool, Dict[str, float]]:
    source_norm = normalize_for_similarity(source_text)
    generated_norm = normalize_for_similarity(generated_markdown)

    source_words = source_norm.split()
    generated_words = generated_norm.split()
    if len(source_words) < 80 or len(generated_words) < 120:
        return True, {
            "shingleOverlapRatio": 0.0,
            "longestExactRunWords": 0.0,
            "sourceWords": float(len(source_words)),
            "generatedWords": float(len(generated_words)),
        }

    source_shingles = shingle_set(source_words, PARAPHRASE_SHINGLE_SIZE)
    generated_shingles = shingle_set(generated_words, PARAPHRASE_SHINGLE_SIZE)
    shared = source_shingles.intersection(generated_shingles)
    overlap_ratio = len(shared) / max(len(generated_shingles), 1)
    longest_run = longest_exact_run_words(generated_words, source_words)

    is_ok = (
        overlap_ratio <= PARAPHRASE_MAX_SHINGLE_OVERLAP
        and longest_run <= PARAPHRASE_MAX_EXACT_RUN_WORDS
    )
    return is_ok, {
        "shingleOverlapRatio": overlap_ratio,
        "longestExactRunWords": float(longest_run),
        "sourceWords": float(len(source_words)),
        "generatedWords": float(len(generated_words)),
    }


def append_source_attribution(
    body_markdown: str,
    candidate: Candidate,
    source_image_url: str,
    image_provider_used: str,
) -> str:
    body = body_markdown.rstrip()
    accessed_on = now_utc().strftime("%Y-%m-%d")
    lines = [
        "### Sources and Attribution",
        (
            f"- Primary source: [{candidate.title}]({candidate.link}) "
            f"({candidate.domain}, accessed {accessed_on} UTC)."
        ),
    ]
    if image_provider_used == "source" and source_image_url:
        lines.append(
            f"- Image source: [{candidate.domain}]({source_image_url}) "
            "(used with editorial attribution)."
        )
    else:
        lines.append("- Image source: Editorial illustration generated for this report.")

    return body + "\n\n" + "\n".join(lines) + "\n"


def extract_json_object(raw_text: str) -> Dict:
    raw_text = raw_text.strip()
    if raw_text.startswith("```"):
        raw_text = re.sub(r"^```[a-zA-Z0-9_-]*\n?", "", raw_text)
        raw_text = re.sub(r"\n?```$", "", raw_text)
    if raw_text.startswith("{"):
        return json.loads(raw_text)

    match = re.search(r"\{[\s\S]*\}", raw_text)
    if not match:
        raise RuntimeError("Gemini response did not contain JSON object")
    return json.loads(match.group(0))


def gemini_text_json(api_key: str, model: str, prompt: str) -> Dict:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}"
        f":generateContent?key={urllib.parse.quote(api_key)}"
    )
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.45,
            "topP": 0.9,
            "responseMimeType": "application/json",
        },
    }
    response = req_json(url, payload, timeout=90, retries=2)
    candidates = response.get("candidates") or []
    if not candidates:
        raise RuntimeError("Gemini returned no candidates")
    parts = candidates[0].get("content", {}).get("parts", [])
    text_parts = [p.get("text", "") for p in parts if isinstance(p, dict) and p.get("text")]
    if not text_parts:
        raise RuntimeError("Gemini response missing text payload")
    return extract_json_object("\n".join(text_parts))


def gemini_generate_image(
    api_key: str, model: str, image_prompt: str
) -> Tuple[bytes, str]:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}"
        f":generateContent?key={urllib.parse.quote(api_key)}"
    )
    payload = {
        "contents": [{"role": "user", "parts": [{"text": image_prompt}]}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "temperature": 0.3,
        },
    }
    response = req_json(url, payload, timeout=140, retries=2)
    for candidate in response.get("candidates", []):
        for part in candidate.get("content", {}).get("parts", []):
            inline = part.get("inlineData")
            if not inline:
                continue
            data = inline.get("data")
            mime = inline.get("mimeType", "image/png")
            if data:
                return base64.b64decode(data), mime
    raise RuntimeError("Gemini image model did not return inline image data")


def image_sharpness_score(image_bytes: bytes) -> float:
    if Image is None or ImageStat is None:
        return 0.0
    with Image.open(io.BytesIO(image_bytes)) as img:
        gray = img.convert("L")
        edges = gray.filter(ImageFilter.FIND_EDGES) if ImageFilter is not None else gray
        return float(ImageStat.Stat(edges).var[0])


def generate_best_gemini_image(
    api_key: str, model: str, image_prompt: str, attempts: int
) -> Tuple[bytes, str, float]:
    attempts = max(1, attempts)
    best_bytes: Optional[bytes] = None
    best_mime = "image/png"
    best_score = -1.0
    final_prompt = f"{normalize_ws(image_prompt)} {IMAGE_QUALITY_SUFFIX}".strip()

    for _ in range(attempts):
        image_bytes, image_mime = gemini_generate_image(
            api_key=api_key, model=model, image_prompt=final_prompt
        )
        sharpness = image_sharpness_score(image_bytes)
        if sharpness > best_score:
            best_score = sharpness
            best_bytes = image_bytes
            best_mime = image_mime

    if best_bytes is None:
        raise RuntimeError("Could not generate any image candidate")
    return best_bytes, best_mime, best_score


def words_count(text: str) -> int:
    stripped = re.sub(r"<[^>]+>", " ", text)
    stripped = re.sub(r"\s+", " ", stripped).strip()
    return 0 if not stripped else len(stripped.split(" "))


def validate_generated_article(payload: Dict) -> None:
    required_fields = [
        "title",
        "subtitle",
        "summary",
        "keywords",
        "shareMessage",
        "donateLine",
        "authorBio",
        "imagePrompt",
        "bodyMarkdown",
    ]
    missing = [key for key in required_fields if not normalize_ws(str(payload.get(key, "")))]
    if missing:
        raise RuntimeError(f"Gemini article JSON missing required fields: {', '.join(missing)}")

    wc = words_count(str(payload["bodyMarkdown"]))
    if wc < 1000:
        raise RuntimeError(f"Generated article too short ({wc} words); need >= 1000")

    body_low = str(payload["bodyMarkdown"]).lower()
    banned_markers = ["opening hook", "[article title", "[subtitle", "all 20 must pass"]
    for marker in banned_markers:
        if marker in body_low:
            raise RuntimeError(f"Generated article contains invalid template marker: {marker}")


def run_cmd(cmd: List[str], cwd: Path, env: Optional[Dict[str, str]] = None) -> str:
    completed = subprocess.run(
        cmd,
        cwd=str(cwd),
        env=env,
        text=True,
        capture_output=True,
        check=False,
    )
    if completed.returncode != 0:
        raise RuntimeError(
            f"Command failed ({' '.join(cmd)}):\nSTDOUT:\n{completed.stdout}\nSTDERR:\n{completed.stderr}"
        )
    return completed.stdout.strip()


def parse_publish_output(stdout: str) -> Dict:
    stdout = stdout.strip()
    if not stdout:
        raise RuntimeError("Publish script produced empty output")
    try:
        return json.loads(stdout)
    except Exception:
        match = re.search(r"\{[\s\S]*\}\s*$", stdout)
        if not match:
            raise RuntimeError(f"Could not parse publish output JSON:\n{stdout}")
        return json.loads(match.group(0))


def verify_live(url: str, expected_title: str, attempts: int = 12, delay_seconds: int = 10) -> bool:
    for _ in range(attempts):
        try:
            html = req_text(url, timeout=20).lower()
            if expected_title.lower() in html:
                return True
        except Exception:
            pass
        time.sleep(delay_seconds)
    return False


def ensure_git_ready(repo_root: Path) -> None:
    run_cmd(["git", "rev-parse", "--is-inside-work-tree"], cwd=repo_root)
    current_ref = run_cmd(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=repo_root)
    if current_ref != "main":
        # Ensure automated publish commits land on main instead of detached HEAD.
        run_cmd(["git", "checkout", "main"], cwd=repo_root)
    run_cmd(["git", "pull", "--ff-only", "origin", "main"], cwd=repo_root)


def choose_threshold(base: int, target_min: int, published_count: int, hours_left: int) -> int:
    needed = max(0, target_min - published_count)
    urgency = needed / max(hours_left, 1)
    threshold = base
    if urgency >= 2.0:
        threshold = base - 16
    elif urgency >= 1.5:
        threshold = base - 10
    elif urgency >= 1.0:
        threshold = base - 6
    return max(52, threshold)


def generate_article_prompt(candidate: Candidate) -> str:
    published_label = (
        candidate.published_at.strftime("%Y-%m-%d %H:%M UTC")
        if candidate.published_at
        else "unknown"
    )
    return f"""
You are writing for Nivaran Foundation's GLOBAL news desk.
Return ONLY JSON. No markdown fences.

Context:
- Source title: {candidate.title}
- Source link: {candidate.link}
- Source summary: {candidate.summary}
- Source domain: {candidate.domain}
- Source published: {published_label}

Hard rules:
1) Topic must be global and related to health or education.
2) Exclude Nepal-specific framing completely.
3) Article quality must be publication-ready, factual, and non-rubbish.
4) Body must be 1000-1300 words in strong paragraph form.
5) Do not write bullet-list style article sections.
6) Do not include placeholders like Opening Hook, Closing, [brackets], template labels.
7) Keep it journalistic, clear, and high-class.
8) Fully paraphrase source material in your own wording; do not copy long source phrases.
9) Include no direct quote unless clearly attributed and very short.

Return JSON with exact keys:
{{
  "title": "compelling headline, max 14 words",
  "subtitle": "one-line subtitle, max 24 words",
  "summary": "2 concise sentences for listing card",
  "keywords": "comma-separated SEO keywords",
  "location": "Global",
  "shareMessage": "under 280 chars, include {{URL}} placeholder",
  "donateLine": "specific one-line support statement tied to this article",
  "authorBio": "Nivaran Foundation global desk bio line",
  "imagePrompt": "photorealistic editorial image prompt for Gemini image model, no text/watermark/logo",
  "bodyMarkdown": "full article markdown with paragraph style and optional subheadings"
}}
""".strip()


def fetch_candidates(source_urls: List[str], trusted_domains: List[str], exclude_terms: List[str]) -> List[Candidate]:
    seen_ids: set[str] = set()
    candidates: List[Candidate] = []

    for feed_url in source_urls:
        try:
            xml_text = req_text(feed_url)
            items = parse_feed_items(xml_text)
        except Exception:
            continue

        for title, link, description, pub in items:
            key = hashlib.sha1((title + "|" + link).encode("utf-8")).hexdigest()
            if key in seen_ids:
                continue
            seen_ids.add(key)
            candidate = build_candidate(
                title=title,
                link=link,
                summary=description,
                pub_raw=pub,
                trusted_domains=trusted_domains,
                exclude_terms=exclude_terms,
            )
            if candidate is None:
                continue
            candidates.append(candidate)

    candidates.sort(key=lambda c: c.score, reverse=True)
    return candidates


def upscale_image_to_8k_long_edge(
    image_bytes: bytes, mime_type: str
) -> Tuple[bytes, str, Tuple[int, int]]:
    if Image is None:
        return image_bytes, mime_type, (0, 0)

    with Image.open(io.BytesIO(image_bytes)) as img:
        src_w, src_h = img.size
        long_edge = max(src_w, src_h)
        if long_edge >= TARGET_IMAGE_LONG_EDGE:
            return image_bytes, mime_type, (src_w, src_h)

        scale = TARGET_IMAGE_LONG_EDGE / float(long_edge)
        dst_w = max(1, int(round(src_w * scale)))
        dst_h = max(1, int(round(src_h * scale)))
        resampling = getattr(Image, "Resampling", Image).LANCZOS
        upscaled = img.resize((dst_w, dst_h), resampling)

        if ImageFilter is not None:
            upscaled = upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=180, threshold=2))

        # Use high-quality JPEG encoding for faster delivery than very large PNGs.
        if upscaled.mode not in ("RGB", "L"):
            upscaled = upscaled.convert("RGB")
        output = io.BytesIO()
        upscaled.save(output, format="JPEG", quality=96, subsampling=0, optimize=True)
        return output.getvalue(), "image/jpeg", (dst_w, dst_h)


def write_image(repo_root: Path, image_bytes: bytes, mime_type: str, slug: str, date_str: str) -> str:
    ext = ".png"
    if mime_type == "image/jpeg":
        ext = ".jpg"
    elif mime_type == "image/webp":
        ext = ".webp"

    year = date_str[:4]
    rel_path = Path("images") / "global-news" / year / f"{date_str}-{slug}{ext}"
    abs_path = repo_root / "public" / rel_path
    abs_path.parent.mkdir(parents=True, exist_ok=True)
    abs_path.write_bytes(image_bytes)
    return "/" + str(rel_path).replace("\\", "/")


def run_pipeline(args: argparse.Namespace) -> Dict:
    repo_root = Path(args.repo_root).resolve()
    state_path = Path(args.state_file).resolve()
    source_cfg_path = Path(args.sources_file).resolve()
    tmp_dir = Path(args.tmp_dir).resolve()
    tmp_dir.mkdir(parents=True, exist_ok=True)

    cfg = load_json(
        source_cfg_path,
        {
            "sourceUrls": [],
            "trustedDomains": [],
            "excludeTerms": ["nepal", "kathmandu", "pokhara", "lalitpur", "karnali"],
            "targetMinIn12Hours": 10,
            "hardMaxIn12Hours": 16,
            "baseQualityScore": 70,
        },
    )

    source_urls: List[str] = cfg.get("sourceUrls") or []
    trusted_domains: List[str] = cfg.get("trustedDomains") or []
    exclude_terms: List[str] = cfg.get("excludeTerms") or []
    target_min: int = int(cfg.get("targetMinIn12Hours", 10))
    hard_max: int = int(cfg.get("hardMaxIn12Hours", 16))
    min_quality_score: int = max(70, int(cfg.get("baseQualityScore", 70)))

    state = load_json(
        state_path,
        {
            "windowStartUtc": "",
            "publishedInWindow": 0,
            "history": [],
            "runs": [],
        },
    )

    now = now_utc()
    window_start_raw = state.get("windowStartUtc")
    window_start = parse_datetime(window_start_raw) if window_start_raw else None
    if window_start is None:
        window_start = floor_hour(now)
        state["windowStartUtc"] = window_start.isoformat().replace("+00:00", "Z")
        state["publishedInWindow"] = 0

    if (now - window_start) >= dt.timedelta(hours=12):
        window_start = floor_hour(now)
        state["windowStartUtc"] = window_start.isoformat().replace("+00:00", "Z")
        state["publishedInWindow"] = 0

    published_in_window = int(state.get("publishedInWindow", 0))
    hours_elapsed = int((now - window_start).total_seconds() // 3600)
    hours_left = max(1, 12 - hours_elapsed)

    history: List[Dict] = state.get("history") or []
    history_ids = {
        item.get("contentHash")
        for item in history
        if isinstance(item, dict) and item.get("contentHash")
    }
    history_source_links = {
        canonicalize_url(str(item.get("sourceUrl", "")))
        for item in history
        if isinstance(item, dict) and item.get("sourceUrl")
    }
    history_title_keys = {
        slugify(normalize_ws(str(item.get("sourceTitle", ""))))
        for item in history
        if isinstance(item, dict) and item.get("sourceTitle")
    }
    existing_source_links, existing_title_keys = extract_existing_content_fingerprints(
        repo_root
    )

    candidates = fetch_candidates(source_urls, trusted_domains, exclude_terms)
    filtered_candidates: List[Candidate] = []
    duplicate_skip_stats = {"historyHash": 0, "historySource": 0, "existingSource": 0, "title": 0}
    for c in candidates:
        content_hash = hashlib.sha1((c.title + "|" + c.link).encode("utf-8")).hexdigest()
        if content_hash in history_ids:
            duplicate_skip_stats["historyHash"] += 1
            continue
        source_link = canonicalize_url(c.link)
        if source_link and source_link in history_source_links:
            duplicate_skip_stats["historySource"] += 1
            continue
        if source_link and source_link in existing_source_links:
            duplicate_skip_stats["existingSource"] += 1
            continue
        title_key = slugify(normalize_ws(c.title))
        if title_key and (title_key in history_title_keys or title_key in existing_title_keys):
            duplicate_skip_stats["title"] += 1
            continue
        filtered_candidates.append(c)

    threshold_used = choose_threshold(
        base=min_quality_score,
        target_min=target_min,
        published_count=published_in_window,
        hours_left=hours_left,
    )
    eligible_candidates = [c for c in filtered_candidates if c.score >= threshold_used]
    shortlist = eligible_candidates[:3]

    run_report: Dict = {
        "ranAtUtc": now.isoformat().replace("+00:00", "Z"),
        "windowStartUtc": state["windowStartUtc"],
        "publishedInWindowBefore": published_in_window,
        "hoursLeftInWindow": hours_left,
        "targetMinIn12Hours": target_min,
        "hardMaxIn12Hours": hard_max,
        "thresholdUsed": threshold_used,
        "candidatesFetched": len(candidates),
        "candidatesAfterDedupe": len(filtered_candidates),
        "duplicateSkips": duplicate_skip_stats,
        "shortlist": [
            {
                "title": c.title,
                "link": c.link,
                "score": c.score,
                "reason": c.reason,
            }
            for c in shortlist
        ],
        "status": "skipped",
        "reason": "",
    }

    if published_in_window >= hard_max:
        run_report["reason"] = (
            f"hard max reached in current 12-hour window ({published_in_window}/{hard_max})"
        )
        state.setdefault("runs", []).append(run_report)
        save_json(state_path, state)
        return run_report

    # User rule: pick top ranked #1 candidate after filters.
    selected = eligible_candidates[0] if eligible_candidates else None
    fallback_used = False
    fallback_min_score = max(DUPLICATE_FALLBACK_MIN_SCORE, threshold_used - 12)
    if selected is None and filtered_candidates:
        fallback_pool = [c for c in filtered_candidates if c.score >= fallback_min_score]
        if fallback_pool:
            selected = fallback_pool[0]
            fallback_used = True
    if selected is None:
        run_report["reason"] = (
            "no non-duplicate trusted global health/education candidate available this hour"
        )
        state.setdefault("runs", []).append(run_report)
        save_json(state_path, state)
        return run_report

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is required")

    text_model = os.getenv("GEMINI_TEXT_MODEL", GEMINI_TEXT_MODEL_DEFAULT)
    image_model = os.getenv("GEMINI_IMAGE_MODEL", GEMINI_IMAGE_MODEL_DEFAULT)
    image_candidates = int(os.getenv("GLOBAL_NEWS_IMAGE_CANDIDATES", "4"))
    article_attempts = max(1, int(os.getenv("GLOBAL_NEWS_ARTICLE_ATTEMPTS", "3")))
    require_paraphrase = os.getenv("GLOBAL_NEWS_REQUIRE_PARAPHRASE", "1").strip().lower() not in {
        "0",
        "false",
        "no",
    }
    image_provider = os.getenv("GLOBAL_NEWS_IMAGE_PROVIDER", "source_first").strip().lower()
    if image_provider not in {"source_first", "gemini_first", "gemini"}:
        image_provider = "source_first"

    article_prompt = generate_article_prompt(selected)
    source_article_text = fetch_source_article_text(selected.link)

    generated: Dict = {}
    paraphrase_metrics: Dict[str, float] = {}
    paraphrase_ok = True
    paraphrase_failure_detail = ""
    generation_prompt = article_prompt
    for attempt in range(1, article_attempts + 1):
        generated = gemini_text_json(api_key=api_key, model=text_model, prompt=generation_prompt)
        validate_generated_article(generated)
        candidate_body = str(generated.get("bodyMarkdown", "")).strip()
        paraphrase_ok = True
        if require_paraphrase and source_article_text:
            paraphrase_ok, paraphrase_metrics = check_paraphrase_quality(
                source_text=source_article_text,
                generated_markdown=candidate_body,
            )
        if paraphrase_ok:
            break
        paraphrase_failure_detail = (
            f"attempt {attempt}: overlap={paraphrase_metrics.get('shingleOverlapRatio', 0):.3f}, "
            f"longest_run={int(paraphrase_metrics.get('longestExactRunWords', 0))}"
        )
        generation_prompt = (
            article_prompt
            + "\n\nRevision required: previous draft was too close to source phrasing. "
            "Rewrite with distinctly different sentence structure and word choice while preserving facts."
        )

    if not generated:
        raise RuntimeError("Gemini did not return article JSON")
    if require_paraphrase and source_article_text and not paraphrase_ok:
        raise RuntimeError(
            "Generated article failed paraphrase quality checks; "
            + (paraphrase_failure_detail or "overlap too high")
        )

    title = normalize_ws(generated["title"])
    subtitle = normalize_ws(generated["subtitle"])
    summary = normalize_ws(generated["summary"])
    keywords = normalize_ws(generated["keywords"])
    location = normalize_ws(generated.get("location", "Global") or "Global")
    share_message = normalize_ws(generated["shareMessage"])
    donate_line = normalize_ws(generated["donateLine"])
    author_bio = normalize_ws(generated["authorBio"])
    image_prompt = normalize_ws(generated["imagePrompt"])
    body_markdown = str(generated["bodyMarkdown"]).strip() + "\n"

    article_slug = slugify(title)
    date_str = now.date().isoformat()

    image_bytes: Optional[bytes] = None
    image_mime = "image/jpeg"
    image_sharpness = 0.0
    source_image_url = ""
    image_provider_used = ""

    if image_provider in {"source_first"}:
        source_fetch = try_fetch_source_image(selected.link)
        if source_fetch is not None:
            image_bytes, image_mime, source_image_url = source_fetch
            image_provider_used = "source"
            image_sharpness = image_sharpness_score(image_bytes)

    if image_bytes is None and image_provider in {"source_first", "gemini_first", "gemini"}:
        image_bytes, image_mime, image_sharpness = generate_best_gemini_image(
            api_key=api_key,
            model=image_model,
            image_prompt=image_prompt,
            attempts=image_candidates,
        )
        image_provider_used = "gemini"

    if image_bytes is None and image_provider == "gemini_first":
        source_fetch = try_fetch_source_image(selected.link)
        if source_fetch is not None:
            image_bytes, image_mime, source_image_url = source_fetch
            image_provider_used = "source"
            image_sharpness = image_sharpness_score(image_bytes)

    if image_bytes is None:
        raise RuntimeError("No usable image source found (Gemini + source fallback failed)")

    image_bytes, image_mime, image_size = upscale_image_to_8k_long_edge(
        image_bytes=image_bytes, mime_type=image_mime
    )
    main_image = write_image(
        repo_root=repo_root,
        image_bytes=image_bytes,
        mime_type=image_mime,
        slug=article_slug or "global-news",
        date_str=date_str,
    )

    body_markdown = append_source_attribution(
        body_markdown=body_markdown,
        candidate=selected,
        source_image_url=source_image_url,
        image_provider_used=image_provider_used,
    )

    timestamp = now.strftime("%Y%m%dT%H%M%SZ")
    body_file = tmp_dir / f"{timestamp}-{article_slug}.body.md"
    config_file = tmp_dir / f"{timestamp}-{article_slug}.json"
    body_file.write_text(body_markdown, encoding="utf-8")

    article_config = {
        "title": title,
        "subtitle": subtitle,
        "summary": summary,
        "mainImage": main_image,
        "coverImageAlt": title,
        "coverImageCaption": (
            f"Source image: {selected.domain}."
            if image_provider_used == "source"
            else f"Source context: {selected.domain}."
        ),
        "type": "News",
        "author": "Nivaran Foundation Global Desk",
        "featured": False,
        "date": date_str,
        "location": location,
        "keywords": keywords,
        "shareMessage": share_message,
        "donateLine": donate_line,
        "authorBio": author_bio,
        "bodyFile": str(body_file),
        "commitMessage": f"Auto publish global news: {title}",
    }
    config_file.write_text(json.dumps(article_config, indent=2, ensure_ascii=False), encoding="utf-8")

    if not args.dry_run:
        ensure_git_ready(repo_root)

    publish_cmd = [
        "node",
        str(repo_root / "scripts" / "publish-article.mjs"),
        "--repo",
        str(repo_root),
        "--config",
        str(config_file),
    ]
    if args.dry_run:
        publish_cmd.append("--dry-run")
    else:
        publish_cmd.extend(["--commit", "--push"])

    publish_stdout = run_cmd(publish_cmd, cwd=repo_root)
    publish_result = parse_publish_output(publish_stdout)

    blog_url = publish_result.get("blogUrl", "")
    live_verified = True
    if blog_url and not args.dry_run:
        live_verified = verify_live(blog_url, title)

    content_hash = hashlib.sha1((selected.title + "|" + selected.link).encode("utf-8")).hexdigest()
    history.append(
        {
            "contentHash": content_hash,
            "sourceTitle": selected.title,
            "sourceUrl": selected.link,
            "publishedAtUtc": now.isoformat().replace("+00:00", "Z"),
            "slug": publish_result.get("slug"),
            "blogUrl": blog_url,
        }
    )
    history = history[-400:]
    state["history"] = history
    if not args.dry_run:
        state["publishedInWindow"] = int(state.get("publishedInWindow", 0)) + 1

    run_report.update(
        {
            "status": "published" if not args.dry_run else "dry-run",
            "reason": "",
            "selectedCandidate": {
                "title": selected.title,
                "link": selected.link,
                "score": selected.score,
                "reason": selected.reason,
            },
            "fallbackUsed": fallback_used,
            "fallbackMinScore": fallback_min_score if fallback_used else None,
            "generatedTitle": title,
            "generatedWordCount": words_count(body_markdown),
            "mainImage": main_image,
            "generatedImageSize": {
                "width": image_size[0],
                "height": image_size[1],
            },
            "generatedImageSharpness": image_sharpness,
            "generatedImageCandidates": image_candidates,
            "articleAttempts": article_attempts,
            "paraphraseRequired": require_paraphrase,
            "paraphrasePassed": paraphrase_ok,
            "paraphraseMetrics": paraphrase_metrics,
            "imageProviderRequested": image_provider,
            "imageProviderUsed": image_provider_used,
            "sourceImageUrl": source_image_url,
            "publishResult": publish_result,
            "liveVerified": live_verified,
            "publishedInWindowAfter": state.get("publishedInWindow", 0),
        }
    )
    state.setdefault("runs", []).append(run_report)
    state["runs"] = state["runs"][-240:]
    save_json(state_path, state)
    return run_report


def parse_args() -> argparse.Namespace:
    root_default = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description="Global_News hourly pipeline")
    parser.add_argument("--repo-root", default=str(root_default), help="Repo root path")
    parser.add_argument(
        "--sources-file",
        default=str(Path(__file__).with_name("global-news.sources.json")),
        help="Source/trust configuration JSON",
    )
    parser.add_argument(
        "--state-file",
        default=str(root_default / ".global_news" / "state.json"),
        help="State file for dedupe and quota window",
    )
    parser.add_argument(
        "--tmp-dir",
        default=str(root_default / ".global_news" / "tmp"),
        help="Temp directory for generated config/body files",
    )
    parser.add_argument("--dry-run", action="store_true", help="Do not commit/push")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        report = run_pipeline(args)
        print(json.dumps(report, indent=2, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
