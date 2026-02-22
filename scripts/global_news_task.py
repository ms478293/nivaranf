#!/usr/bin/env python3
"""Global_News hourly pipeline for OpenClaw.

Flow:
1) Pull global health/education stories from trusted RSS feeds.
2) Keep only trusted/verified, non-Nepal candidates related to health or education.
3) Remove duplicates against prior runs + existing global posts, then pick top ranked #1.
4) Apply adaptive quality threshold and cached-candidate backfill for hourly continuity.
5) Generate long-form paraphrased article + image prompt via Gemini.
6) Prefer source image with attribution; fallback to Gemini image model.
7) Publish using scripts/publish-article.mjs (same site template pipeline).
"""

from __future__ import annotations

import argparse
import base64
import datetime as dt
import email.utils
import gzip
import html
import hashlib
import io
import json
import os
import random
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zlib
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

try:
    from PIL import Image, ImageDraw, ImageFilter, ImageStat
except Exception:
    Image = None
    ImageDraw = None
    ImageFilter = None
    ImageStat = None

USER_AGENT = "Mozilla/5.0 (compatible; NivaranGlobalNewsBot/1.0)"
GEMINI_TEXT_MODEL_DEFAULT = "gemini-pro-latest"
GEMINI_IMAGE_MODEL_DEFAULT = "gemini-2.0-flash-exp-image-generation"
DEFAULT_TIMEOUT_SECONDS = 60
DEFAULT_FEED_TIMEOUT_SECONDS = 12
DEFAULT_FEED_RETRIES = 1
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
CANDIDATE_CACHE_MAX_ITEMS = 240
CANDIDATE_CACHE_MAX_AGE_HOURS = 96
DUPLICATE_SOURCE_COOLDOWN_HOURS = 6
DOMAIN_PUBLISH_WINDOW_HOURS = 24
MAX_DOMAIN_PUBLISHES_24H = 2
MIN_PRIMARY_CANDIDATES_BEFORE_FALLBACK = 5
GOOGLE_NEWS_FALLBACK_TOPICS = [
    "global health",
    "public health policy",
    "global education",
    "education policy",
    "school health",
    "health and education reform",
]
EMERGENCY_TRUSTED_FALLBACK_LIBRARY = [
    {
        "title": "Global health financing and universal coverage implementation update",
        "link": "https://www.who.int/news-room/fact-sheets/detail/universal-health-coverage-(uhc)",
        "summary": "Evidence-led update focused on universal health coverage, access, and system resilience.",
        "domain": "who.int",
    },
    {
        "title": "Global education equity and learning continuity policy update",
        "link": "https://www.unesco.org/en/education",
        "summary": "International education policy progress on learning continuity, inclusion, and outcomes.",
        "domain": "unesco.org",
    },
    {
        "title": "Child health and education continuity strategy update",
        "link": "https://www.unicef.org/education",
        "summary": "Cross-country education and child wellbeing priorities with measurable impact indicators.",
        "domain": "unicef.org",
    },
    {
        "title": "Global child and adolescent health systems update",
        "link": "https://www.unicef.org/health",
        "summary": "Global child health performance and delivery constraints affecting vulnerable communities.",
        "domain": "unicef.org",
    },
    {
        "title": "Health and education systems resilience in low-resource settings",
        "link": "https://www.worldbank.org/en/topic/health",
        "summary": "Health systems strengthening and service delivery reform with implications for education access.",
        "domain": "worldbank.org",
    },
    {
        "title": "Education systems transformation and access update",
        "link": "https://www.worldbank.org/en/topic/education/overview",
        "summary": "Education quality, access, and financing trends shaping long-term population health.",
        "domain": "worldbank.org",
    },
    {
        "title": "Cross-border health preparedness and response update",
        "link": "https://www.cdc.gov/globalhealth/index.html",
        "summary": "Global preparedness and public health response coordination across regions.",
        "domain": "cdc.gov",
    },
    {
        "title": "Global health research pipeline and evidence translation update",
        "link": "https://www.fic.nih.gov/Global/Pages/default.aspx",
        "summary": "Global health research priorities and implementation pathways for frontline impact.",
        "domain": "nih.gov",
    },
    {
        "title": "Global health outcomes and inequality data insight update",
        "link": "https://ourworldindata.org/health-meta",
        "summary": "Data-led global health trends relevant to policy, equity, and access.",
        "domain": "ourworldindata.org",
    },
    {
        "title": "Global education outcomes and learning gap update",
        "link": "https://ourworldindata.org/global-education",
        "summary": "Evidence-driven education outcomes and attainment gap monitoring worldwide.",
        "domain": "ourworldindata.org",
    },
    {
        "title": "Global health and social policy performance update",
        "link": "https://www.oecd.org/health/",
        "summary": "Comparative policy performance on healthcare quality, access, and education-linked outcomes.",
        "domain": "oecd.org",
    },
    {
        "title": "Global education policy and student outcomes synthesis",
        "link": "https://www.oecd.org/education/",
        "summary": "Education policy benchmarks and system performance affecting social mobility and health.",
        "domain": "oecd.org",
    },
    {
        "title": "Global health emergency desk update",
        "link": "https://www.reuters.com/business/healthcare-pharmaceuticals/",
        "summary": "Verified global reporting stream on health systems, medicines, and policy developments.",
        "domain": "reuters.com",
    },
    {
        "title": "Global education and public service reform update",
        "link": "https://www.reuters.com/world/",
        "summary": "Trusted international desk coverage of education and social sector reform.",
        "domain": "reuters.com",
    },
    {
        "title": "Public health and education accountability update",
        "link": "https://apnews.com/hub/health",
        "summary": "Verified global coverage of health system strain, reform, and access challenges.",
        "domain": "apnews.com",
    },
    {
        "title": "School systems and learning access update",
        "link": "https://apnews.com/hub/education",
        "summary": "Trusted reporting on education access, school policy, and learning continuity.",
        "domain": "apnews.com",
    },
    {
        "title": "Global healthcare and education spotlight update",
        "link": "https://www.bbc.com/news/health",
        "summary": "International coverage of health risk signals and evidence-linked education impacts.",
        "domain": "bbc.com",
    },
    {
        "title": "Global education challenges and recovery update",
        "link": "https://www.theguardian.com/education",
        "summary": "Global education access, equity, and recovery trends with policy implications.",
        "domain": "theguardian.com",
    },
    {
        "title": "Global health service and inequality update",
        "link": "https://www.ft.com/health",
        "summary": "High-credibility reporting on healthcare financing, policy, and service delivery.",
        "domain": "ft.com",
    },
]

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
                raw = response.read()
                content_encoding = (response.headers.get("Content-Encoding") or "").lower()
                if "gzip" in content_encoding or raw[:2] == b"\x1f\x8b":
                    try:
                        raw = gzip.decompress(raw)
                    except Exception:
                        pass
                elif "deflate" in content_encoding:
                    try:
                        raw = zlib.decompress(raw)
                    except Exception:
                        pass
                return raw.decode("utf-8", errors="ignore")
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


def is_network_error(exc: Exception) -> bool:
    text = normalize_ws(str(exc)).lower()
    network_markers = (
        "urlopen error",
        "nodename nor servname provided",
        "name or service not known",
        "temporary failure in name resolution",
        "could not resolve host",
        "network is unreachable",
        "connection refused",
        "connection reset",
        "timed out",
        "timeout",
        "no route to host",
    )
    return any(marker in text for marker in network_markers)


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

    for fmt in (
        "%Y-%m-%dT%H:%M:%S.%fZ",
        "%Y-%m-%dT%H:%M:%S.%f%z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%d",
    ):
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
    xml_text = (xml_text or "").strip()
    if not xml_text:
        return items
    first_tag = xml_text.find("<")
    if first_tag > 0:
        xml_text = xml_text[first_tag:]
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


def candidate_to_cache_record(candidate: Candidate, cached_at: dt.datetime) -> Dict:
    published = ""
    if candidate.published_at:
        published = candidate.published_at.isoformat().replace("+00:00", "Z")
    return {
        "title": candidate.title,
        "link": candidate.link,
        "summary": candidate.summary,
        "publishedAtUtc": published,
        "domain": candidate.domain,
        "score": float(candidate.score),
        "healthHits": int(candidate.health_hits),
        "educationHits": int(candidate.education_hits),
        "reason": candidate.reason,
        "cachedAtUtc": cached_at.isoformat().replace("+00:00", "Z"),
    }


def candidate_from_cache_record(record: Dict) -> Optional[Candidate]:
    if not isinstance(record, dict):
        return None
    title = normalize_ws(str(record.get("title", "")))
    link = normalize_ws(str(record.get("link", "")))
    if not title or not link:
        return None
    summary = normalize_ws(str(record.get("summary", "")))
    domain = normalize_ws(str(record.get("domain", ""))) or domain_of(link)
    try:
        score = float(record.get("score", 0.0))
    except Exception:
        score = 0.0
    try:
        health_hits = int(record.get("healthHits", 0))
    except Exception:
        health_hits = 0
    try:
        education_hits = int(record.get("educationHits", 0))
    except Exception:
        education_hits = 0
    published_at = parse_datetime(str(record.get("publishedAtUtc", "")))
    reason = normalize_ws(str(record.get("reason", "")))
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


def cache_key_for_candidate(candidate: Candidate) -> str:
    normalized_link = canonicalize_url(candidate.link)
    if normalized_link:
        return normalized_link
    return f"title:{slugify(candidate.title)}"


def merge_candidate_cache(
    previous_records: List[Dict], fresh_candidates: List[Candidate], now: dt.datetime
) -> List[Dict]:
    min_cached_at = now - dt.timedelta(hours=CANDIDATE_CACHE_MAX_AGE_HOURS)
    merged: List[Dict] = []
    seen_keys: set[str] = set()

    for candidate in fresh_candidates:
        key = cache_key_for_candidate(candidate)
        if not key or key in seen_keys:
            continue
        seen_keys.add(key)
        merged.append(candidate_to_cache_record(candidate, cached_at=now))

    for record in previous_records:
        candidate = candidate_from_cache_record(record)
        if candidate is None:
            continue
        cached_at = parse_datetime(str(record.get("cachedAtUtc", "")))
        if cached_at is None or cached_at < min_cached_at:
            continue
        key = cache_key_for_candidate(candidate)
        if not key or key in seen_keys:
            continue
        seen_keys.add(key)
        record["cachedAtUtc"] = cached_at.isoformat().replace("+00:00", "Z")
        merged.append(record)
        if len(merged) >= CANDIDATE_CACHE_MAX_ITEMS:
            break

    return merged[:CANDIDATE_CACHE_MAX_ITEMS]


def bootstrap_cache_records_from_runs(runs: List[Dict], now: dt.datetime) -> List[Dict]:
    provisional: List[Candidate] = []
    if not isinstance(runs, list):
        return []

    for run in reversed(runs[-72:]):
        if not isinstance(run, dict):
            continue
        shortlist = run.get("shortlist") or []
        if isinstance(shortlist, list):
            for item in shortlist:
                if not isinstance(item, dict):
                    continue
                title = normalize_ws(str(item.get("title", "")))
                link = normalize_ws(str(item.get("link", "")))
                if not title or not link:
                    continue
                try:
                    score = float(item.get("score", 0.0))
                except Exception:
                    score = 0.0
                provisional.append(
                    Candidate(
                        title=title,
                        link=link,
                        summary="",
                        published_at=None,
                        domain=domain_of(link),
                        score=score,
                        health_hits=0,
                        education_hits=0,
                        reason=normalize_ws(str(item.get("reason", ""))),
                    )
                )

        selected = run.get("selectedCandidate")
        if isinstance(selected, dict):
            title = normalize_ws(str(selected.get("title", "")))
            link = normalize_ws(str(selected.get("link", "")))
            if title and link:
                try:
                    score = float(selected.get("score", 0.0))
                except Exception:
                    score = 0.0
                provisional.append(
                    Candidate(
                        title=title,
                        link=link,
                        summary="",
                        published_at=None,
                        domain=domain_of(link),
                        score=score,
                        health_hits=0,
                        education_hits=0,
                        reason=normalize_ws(str(selected.get("reason", ""))),
                    )
                )

    return merge_candidate_cache(previous_records=[], fresh_candidates=provisional, now=now)


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
    domain_override: Optional[str] = None,
) -> Optional[Candidate]:
    merged_text = f"{title} {summary}".lower()
    if any(term.lower() in merged_text for term in exclude_terms):
        return None
    if contains_blocked_term(merged_text):
        return None

    domain = normalize_ws(domain_override or "") or domain_of(link)
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
    _ = (candidate, source_image_url, image_provider_used)
    return body_markdown.rstrip() + "\n"


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


def pick_candidate_with_domain_diversity(
    pool: List[Candidate], recent_domains: set[str]
) -> Tuple[Optional[Candidate], bool]:
    if not pool:
        return None, False
    for candidate in pool:
        if candidate.domain not in recent_domains:
            return candidate, True
    return pool[0], False


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


def trim_words(text: str, max_words: int) -> str:
    words = normalize_ws(text).split(" ")
    if len(words) <= max_words:
        return normalize_ws(text)
    return normalize_ws(" ".join(words[:max_words]).rstrip(" ,.;:-"))


def build_offline_article_payload(candidate: Candidate, now: dt.datetime) -> Dict:
    source_title = normalize_ws(candidate.title)
    source_summary = normalize_ws(candidate.summary)
    source_domain = candidate.domain or domain_of(candidate.link)
    source_domain_label = source_domain.upper() if source_domain else "TRUSTED GLOBAL DESK"
    publish_label = now.strftime("%B %d, %Y")
    compact_headline = trim_words(source_title, 10)
    title = trim_words(
        f"Global Health and Education Watch: {compact_headline}",
        14,
    )
    subtitle = trim_words(
        "Why this international signal matters for service delivery, policy choices, and frontline outcomes.",
        24,
    )
    summary = (
        "A high-impact global update is reshaping how health and education systems prioritize access, "
        "staffing, and continuity. This analysis maps the operational consequences for vulnerable communities."
    )
    keywords = (
        "global health, global education, public policy, health systems, education systems, "
        "service continuity, equity, crisis preparedness"
    )
    share_message = (
        "Global health and education are moving together under the same policy pressure. "
        "Read the full Nivaran analysis: {URL}"
    )
    donate_line = (
        "Sustained field reporting and accountable publishing are what keep critical global signals "
        "visible before they become humanitarian emergencies."
    )
    author_bio = (
        "Nivaran Foundation Global Desk tracks health and education risk signals worldwide and "
        "translates them into practical public-interest reporting."
    )
    image_prompt = (
        "Cinematic, photorealistic editorial scene representing global public health and education systems "
        "under pressure, with real people, institutions, and infrastructure in natural light, no text, no logo."
    )

    opening_context = (
        source_summary
        if source_summary
        else "The latest verified update points to a structural shift with immediate downstream effects."
    )

    paragraphs = [
        (
            f"On {publish_label}, one of the clearest global signals came through {source_domain_label}: "
            f"{source_title}. The line may read like a headline, but the implications are operational. "
            f"{opening_context} In moments like this, the real question is not only what happened, but what "
            "gets delayed next: a vaccination schedule, a school meal chain, a maternal referral, or a teacher "
            "posting in a district where one interruption can close an entire service corridor."
        ),
        (
            "Health and education are often discussed in separate policy rooms, yet in real communities they "
            "are a single daily system. When healthcare access weakens, school attendance drops because children "
            "are sick, caregivers are absent, and household budgets are redirected to emergency treatment. When "
            "education continuity weakens, health outcomes decline because prevention messages, early warning "
            "communication, and basic protective behaviors lose reach. A global development therefore has local "
            "consequences long before ministries issue formal guidance."
        ),
        (
            "This is why credibility of source matters as much as speed. Information that is merely loud can "
            "push organizations toward reaction theater, while verified reporting supports disciplined action. "
            "For frontline teams, discipline means triaging what to monitor first, what to communicate publicly, "
            "and which operating assumptions must change before the next shift. The value of a strong signal is "
            "not drama. The value is lead time. Lead time is what converts uncertainty into preparedness."
        ),
        (
            f"The current signal from {source_domain_label} sits at the intersection of financing pressure, "
            "workforce strain, and uneven access. In many countries, the same local institutions are expected "
            "to expand services while absorbing budget volatility, higher caseload complexity, and growing public "
            "expectations. That mismatch does not fail all at once. It fails in sequence: first wait times, then "
            "coverage reliability, then trust. Once trust breaks, both clinical care and learning continuity "
            "become harder to stabilize."
        ),
        (
            "A major blind spot in global commentary is the assumption that policy announcements automatically "
            "become implementation reality. Field operations show the opposite. Every policy has a translation gap "
            "between central intent and frontline execution. In health, that gap appears as stockouts, referral "
            "friction, and uneven triage quality. In education, it appears as absenteeism, content discontinuity, "
            "and widening attainment differences. Reporting that ignores this translation gap misses where people "
            "actually experience risk."
        ),
        (
            "Another overlooked layer is time. Communities do not experience policy on quarterly timelines. They "
            "experience it in daily routines: whether a clinic opens on schedule, whether medicines are available, "
            "whether children can safely stay in class, and whether transport remains affordable. A global update "
            "matters when it changes those routines, even subtly. Repeated small disruptions accumulate into "
            "long-term harm, especially for households already operating with narrow margins."
        ),
        (
            "From a preparedness perspective, the correct response is not panic publishing. It is structured "
            "scenario work. If the signal intensifies, what fails first? If it stabilizes, what recovery actions "
            "can reduce future fragility? If it reverses, what should remain because it improved resilience anyway? "
            "Organizations that pre-define these branches make better decisions under pressure because they are not "
            "starting from zero each time a new headline appears."
        ),
        (
            "The public conversation also needs a sharper equity lens. The same global trend can produce very "
            "different outcomes depending on geography, income, disability status, migration status, and gender. "
            "In better-connected regions, shocks are absorbed by redundancy. In underserved regions, shocks are "
            "absorbed by people. Families pay with time, missed wages, deferred treatment, and interrupted learning. "
            "That transfer of burden from systems to households is where policy failure becomes social injustice."
        ),
        (
            "For health systems, practical safeguards include tighter early-warning loops, transparent stock "
            "monitoring, and referral pathways that remain usable during stress. For education systems, safeguards "
            "include continuity plans that protect attendance, reduce dropout risk, and preserve teacher support. "
            "Neither set of safeguards is expensive compared with the long-run cost of unmanaged disruption. "
            "What is expensive is waiting until service collapse becomes visible in national indicators."
        ),
        (
            "For institutions communicating with the public, clarity is a core intervention. Communities can absorb "
            "bad news when information is precise, honest, and actionable. They struggle when messaging alternates "
            "between reassurance and alarm with no operational detail. Good communication states what changed, what "
            "has not changed, who is affected first, and what concrete steps are available now. That structure reduces "
            "fear and improves compliance without sacrificing truth."
        ),
        (
            "For Nivaran's global desk, the standard is simple: follow credible sources, translate implications into "
            "human outcomes, and keep the analysis grounded in service continuity. We do not treat health and education "
            "as abstract sectors. We treat them as the core infrastructure of dignity. When global signals indicate "
            "stress, our responsibility is to map consequence early and publish with enough depth that teams, partners, "
            "and readers can act intelligently."
        ),
        (
            "The strongest reporting is not the loudest reporting. It is the reporting that helps decision-makers "
            "protect people before systems drift into preventable failure. This update should be read in that spirit: "
            "as an early operational map, not a passing headline. If the world is entering a more volatile cycle for "
            "public services, then speed must be paired with rigor, and urgency must be paired with accountability. "
            "That is how public trust is earned and how outcomes are defended."
        ),
        (
            "There is also a governance lesson here. Governments and institutions that publish assumptions, thresholds, "
            "and contingency plans before disruption tend to recover faster than those that communicate only after "
            "failure becomes visible. Transparency is not a communications style; it is an operating model. It gives "
            "clinicians, school leaders, and local administrators the confidence to escalate early, share constraints, "
            "and coordinate across sectors without waiting for perfect certainty. In complex systems, delayed candor is "
            "often more damaging than early caution."
        ),
        (
            "The financing side deserves equal attention. A short-term fiscal squeeze can trigger long-term losses when "
            "prevention programs are paused, school support services are narrowed, or frontline staffing is treated as "
            "variable cost instead of core capacity. The savings appear immediate, but the liabilities arrive later as "
            "higher disease burden, lower learning outcomes, and deeper inequality. A resilient approach protects the "
            "lowest-cost, highest-impact interventions first, then rebuilds around continuity rather than visible optics."
        ),
        (
            "Digital infrastructure is frequently presented as a silver bullet, but it only helps when paired with "
            "human systems that can absorb and act on information. Dashboards do not treat patients. Platforms do not "
            "teach children by themselves. Technology is an amplifier: it can strengthen good coordination, or it can "
            "scale confusion when governance is weak. The practical test is simple: does new data trigger faster, better "
            "decisions at facility and school level, or does it remain trapped in reporting loops disconnected from service?"
        ),
        (
            "For readers tracking global developments, the priority is to watch for convergence. When multiple trusted "
            "signals point in the same direction, the risk is no longer theoretical. Convergence is the moment to act: "
            "tighten continuity plans, protect essential services, strengthen local communication, and measure whether "
            "the most vulnerable groups are seeing better outcomes or deeper exclusion. This is where careful reporting "
            "becomes practical protection. The objective is not to predict every shock. The objective is to reduce avoidable harm."
        ),
    ]

    body_markdown = "\n\n".join(paragraphs).strip()
    return {
        "title": title,
        "subtitle": subtitle,
        "summary": summary,
        "keywords": keywords,
        "location": "Global",
        "shareMessage": share_message,
        "donateLine": donate_line,
        "authorBio": author_bio,
        "imagePrompt": image_prompt,
        "bodyMarkdown": body_markdown,
    }


def generate_offline_editorial_image(seed_text: str) -> Tuple[bytes, str, float]:
    if Image is None:
        # Minimal valid JPEG (fallback only when Pillow is unavailable).
        tiny_jpeg = base64.b64decode(
            "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEA8QDw8QDw8QDw8PDw8QFREWFhURFRUYHSggGBolGxUV"
            "ITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0fHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t"
            "LS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQ"
            "EAAAAAAAAAAAAAAAAAAQAC/9oADAMBAAIQAxAAAAG8wH//xAAaEAADAQEBAQAAAAAAAAAAAAABAhEAAxIh/9oACAEB"
            "AAEFAhWb0k4Q8a0Qf//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAACD/"
            "2gAIAQIBAT8BP//EABsQAQACAgMAAAAAAAAAAAAAAAEAESExQVFh/9oACAEBAAY/AtH5q3EtlSqf/8QAGxABAQEAAgM"
            "BAAAAAAAAAAAAAQARITFBUWFxgfD/2gAIAQEAAT8hQX7fRA4p8ijmYf0VQtn6FDNwKqM1l//aAAwDAQACAAMAAAAQ8/"
            "/EABYRAQEBAAAAAAAAAAAAAAAAAAARIf/aAAgBAwEBPxBX/8QAFhEBAQEAAAAAAAAAAAAAAAAAARAh/9oACAECAQE/"
            "EFf/xAAcEAEBAAICAwAAAAAAAAAAAAABEQAhMUFRYXH/2gAIAQEAAT8QZwh7bbT9b6hQ1N5aNwT8PPdLpnrKXgW6Hf/Z"
        )
        return tiny_jpeg, "image/jpeg", 0.0

    width, height = 2560, 1440
    seed = int(hashlib.sha1(seed_text.encode("utf-8")).hexdigest()[:8], 16)
    rng = random.Random(seed)

    top_left = (33 + rng.randint(0, 16), 88 + rng.randint(0, 24), 132 + rng.randint(0, 24))
    top_right = (57 + rng.randint(0, 20), 124 + rng.randint(0, 18), 168 + rng.randint(0, 18))
    bottom_left = (15 + rng.randint(0, 14), 34 + rng.randint(0, 12), 52 + rng.randint(0, 12))
    bottom_right = (24 + rng.randint(0, 16), 58 + rng.randint(0, 14), 84 + rng.randint(0, 14))

    base = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(base)
    for y in range(height):
        fy = y / float(height - 1)
        for x in range(width):
            fx = x / float(width - 1)
            r = int(
                (1 - fy) * ((1 - fx) * top_left[0] + fx * top_right[0])
                + fy * ((1 - fx) * bottom_left[0] + fx * bottom_right[0])
            )
            g = int(
                (1 - fy) * ((1 - fx) * top_left[1] + fx * top_right[1])
                + fy * ((1 - fx) * bottom_left[1] + fx * bottom_right[1])
            )
            b = int(
                (1 - fy) * ((1 - fx) * top_left[2] + fx * top_right[2])
                + fy * ((1 - fx) * bottom_left[2] + fx * bottom_right[2])
            )
            draw.point((x, y), fill=(r, g, b))

    ridge_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ridge_draw = ImageDraw.Draw(ridge_overlay)
    ridge_1 = [
        (0, int(height * 0.72)),
        (int(width * 0.16), int(height * 0.55)),
        (int(width * 0.33), int(height * 0.62)),
        (int(width * 0.51), int(height * 0.41)),
        (int(width * 0.69), int(height * 0.58)),
        (int(width * 0.87), int(height * 0.51)),
        (width, int(height * 0.65)),
        (width, height),
        (0, height),
    ]
    ridge_2 = [
        (0, int(height * 0.83)),
        (int(width * 0.12), int(height * 0.73)),
        (int(width * 0.29), int(height * 0.79)),
        (int(width * 0.48), int(height * 0.64)),
        (int(width * 0.66), int(height * 0.78)),
        (int(width * 0.86), int(height * 0.70)),
        (width, int(height * 0.80)),
        (width, height),
        (0, height),
    ]
    ridge_draw.polygon(ridge_1, fill=(235, 244, 252, 118))
    ridge_draw.polygon(ridge_2, fill=(198, 220, 236, 78))

    cloud_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    cloud_draw = ImageDraw.Draw(cloud_overlay)
    for _ in range(28):
        cx = rng.randint(0, width)
        cy = rng.randint(int(height * 0.08), int(height * 0.94))
        rw = rng.randint(140, 420)
        rh = rng.randint(48, 140)
        alpha = rng.randint(16, 44)
        cloud_draw.ellipse((cx - rw, cy - rh, cx + rw, cy + rh), fill=(255, 255, 255, alpha))

    merged = Image.alpha_composite(base.convert("RGBA"), ridge_overlay)
    merged = Image.alpha_composite(merged, cloud_overlay)
    merged_rgb = merged.convert("RGB")
    if ImageFilter is not None:
        merged_rgb = merged_rgb.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))

    output = io.BytesIO()
    merged_rgb.save(output, format="JPEG", quality=95, optimize=True, subsampling=0)
    image_bytes = output.getvalue()
    return image_bytes, "image/jpeg", image_sharpness_score(image_bytes)


def fetch_candidates(
    source_urls: List[str],
    trusted_domains: List[str],
    exclude_terms: List[str],
    feed_timeout_seconds: int = DEFAULT_FEED_TIMEOUT_SECONDS,
    feed_retries: int = DEFAULT_FEED_RETRIES,
) -> Tuple[List[Candidate], int]:
    seen_ids: set[str] = set()
    candidates: List[Candidate] = []
    fetch_network_errors = 0

    for feed_url in source_urls:
        try:
            xml_text = req_text(
                feed_url,
                timeout=feed_timeout_seconds,
                retries=feed_retries,
            )
            items = parse_feed_items(xml_text)
        except Exception:
            fetch_network_errors += 1
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
    return candidates, fetch_network_errors


def merge_candidates(primary: List[Candidate], fallback: List[Candidate]) -> List[Candidate]:
    merged: List[Candidate] = []
    seen: set[str] = set()
    for candidate in [*primary, *fallback]:
        key = canonicalize_url(candidate.link) or f"title:{slugify(candidate.title)}:{candidate.domain}"
        if not key or key in seen:
            continue
        seen.add(key)
        merged.append(candidate)
    merged.sort(key=lambda c: c.score, reverse=True)
    return merged


def fetch_google_news_fallback_candidates(
    trusted_domains: List[str],
    exclude_terms: List[str],
    topics: List[str],
    language: str = "en-US",
    region: str = "US",
    edition: str = "US:en",
    feed_timeout_seconds: int = DEFAULT_FEED_TIMEOUT_SECONDS,
    feed_retries: int = DEFAULT_FEED_RETRIES,
) -> Tuple[List[Candidate], int]:
    if not topics:
        topics = GOOGLE_NEWS_FALLBACK_TOPICS

    candidates: List[Candidate] = []
    seen: set[str] = set()
    fetch_network_errors = 0
    for topic in topics:
        query = urllib.parse.quote(topic.strip())
        if not query:
            continue
        feed_url = (
            "https://news.google.com/rss/search?"
            f"q={query}&hl={urllib.parse.quote(language)}&gl={urllib.parse.quote(region)}&ceid={urllib.parse.quote(edition)}"
        )
        try:
            xml_text = req_text(
                feed_url,
                timeout=feed_timeout_seconds,
                retries=feed_retries,
            )
            items = parse_feed_items(xml_text)
        except Exception:
            fetch_network_errors += 1
            continue

        # Parse again to capture <source url="..."> metadata specific to Google News RSS.
        source_meta: Dict[str, str] = {}
        try:
            xml_text = (xml_text or "").strip()
            first_tag = xml_text.find("<")
            if first_tag > 0:
                xml_text = xml_text[first_tag:]
            root = ET.fromstring(xml_text)
            for item in root.findall(".//item"):
                link = normalize_ws(item.findtext("link", default="") or "")
                source_node = item.find("source")
                source_url = ""
                if source_node is not None:
                    source_url = normalize_ws(source_node.attrib.get("url", "") or "")
                if link and source_url:
                    source_meta[canonicalize_url(link)] = source_url
        except Exception:
            pass

        for title, link, description, pub in items:
            link_key = canonicalize_url(link) or link
            if link_key in seen:
                continue
            seen.add(link_key)
            source_url = source_meta.get(link_key, "")
            source_domain = domain_of(source_url)
            if not source_domain:
                continue
            candidate = build_candidate(
                title=title,
                link=link,
                summary=description,
                pub_raw=pub,
                trusted_domains=trusted_domains,
                exclude_terms=exclude_terms,
                domain_override=source_domain,
            )
            if candidate is None:
                continue
            candidate.reason = f"{candidate.reason}, provider=google_news_fallback"
            candidates.append(candidate)

    candidates.sort(key=lambda c: c.score, reverse=True)
    return candidates, fetch_network_errors


def build_emergency_fallback_candidates(
    trusted_domains: List[str],
    exclude_terms: List[str],
    now: dt.datetime,
    size: int = 8,
) -> List[Candidate]:
    records = EMERGENCY_TRUSTED_FALLBACK_LIBRARY[:]
    if not records:
        return []

    # Rotate library by hour to avoid repeating the same source pattern.
    offset = int(now.timestamp() // 3600) % len(records)
    rotated = records[offset:] + records[:offset]

    candidates: List[Candidate] = []
    for record in rotated:
        candidate = build_candidate(
            title=str(record.get("title", "")),
            link=str(record.get("link", "")),
            summary=str(record.get("summary", "")),
            pub_raw=now.isoformat().replace("+00:00", "Z"),
            trusted_domains=trusted_domains,
            exclude_terms=exclude_terms,
            domain_override=str(record.get("domain", "")),
        )
        if candidate is None:
            continue
        candidate.reason = f"{candidate.reason}, provider=emergency_library"
        candidates.append(candidate)
        if len(candidates) >= max(1, size):
            break

    candidates.sort(key=lambda c: c.score, reverse=True)
    return candidates


def recent_domain_publish_counts(
    history: List[Dict], now: dt.datetime, window_hours: int
) -> Dict[str, int]:
    counts: Dict[str, int] = {}
    cutoff = now - dt.timedelta(hours=max(1, window_hours))
    for item in history:
        if not isinstance(item, dict):
            continue
        published = parse_datetime(str(item.get("publishedAtUtc", "")))
        if published is None or published < cutoff:
            continue
        domain = normalize_ws(str(item.get("sourceDomain", ""))) or domain_of(
            str(item.get("sourceUrl", ""))
        )
        if not domain:
            continue
        counts[domain] = counts.get(domain, 0) + 1
    return counts


def apply_domain_publish_cap(
    pool: List[Candidate], domain_counts: Dict[str, int], max_per_window: int
) -> List[Candidate]:
    cap = max(1, max_per_window)
    restricted = [c for c in pool if domain_counts.get(c.domain, 0) < cap]
    return restricted if restricted else pool


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
            "forcePublishEveryRun": True,
            "domainDiversityWindowRuns": 4,
            "enableGoogleNewsFallback": True,
            "googleNewsTopics": GOOGLE_NEWS_FALLBACK_TOPICS,
            "googleNewsLanguage": "en-US",
            "googleNewsRegion": "US",
            "googleNewsEdition": "US:en",
            "minPrimaryCandidatesBeforeFallback": MIN_PRIMARY_CANDIDATES_BEFORE_FALLBACK,
            "maxDomainPublishes24Hours": MAX_DOMAIN_PUBLISHES_24H,
            "domainPublishWindowHours": DOMAIN_PUBLISH_WINDOW_HOURS,
            "allowRepeatSourceIfNeeded": True,
            "repeatSourceCooldownHours": DUPLICATE_SOURCE_COOLDOWN_HOURS,
            "enableEmergencyFallback": True,
            "emergencyPoolSize": 8,
            "allowOfflineGenerationFallback": True,
            "feedTimeoutSeconds": DEFAULT_FEED_TIMEOUT_SECONDS,
            "feedRetries": DEFAULT_FEED_RETRIES,
        },
    )

    source_urls: List[str] = cfg.get("sourceUrls") or []
    trusted_domains: List[str] = cfg.get("trustedDomains") or []
    exclude_terms: List[str] = cfg.get("excludeTerms") or []
    target_min: int = int(cfg.get("targetMinIn12Hours", 10))
    hard_max: int = int(cfg.get("hardMaxIn12Hours", 16))
    min_quality_score: int = max(70, int(cfg.get("baseQualityScore", 70)))
    force_publish_every_run: bool = bool(cfg.get("forcePublishEveryRun", True))
    domain_diversity_window_runs: int = max(0, int(cfg.get("domainDiversityWindowRuns", 4)))
    enable_google_news_fallback: bool = bool(cfg.get("enableGoogleNewsFallback", True))
    google_news_topics: List[str] = [
        normalize_ws(str(topic))
        for topic in (cfg.get("googleNewsTopics") or GOOGLE_NEWS_FALLBACK_TOPICS)
        if normalize_ws(str(topic))
    ]
    google_news_language = normalize_ws(str(cfg.get("googleNewsLanguage", "en-US"))) or "en-US"
    google_news_region = normalize_ws(str(cfg.get("googleNewsRegion", "US"))) or "US"
    google_news_edition = normalize_ws(str(cfg.get("googleNewsEdition", "US:en"))) or "US:en"
    min_primary_before_fallback = max(
        1, int(cfg.get("minPrimaryCandidatesBeforeFallback", MIN_PRIMARY_CANDIDATES_BEFORE_FALLBACK))
    )
    max_domain_publishes_24h = max(
        1, int(cfg.get("maxDomainPublishes24Hours", MAX_DOMAIN_PUBLISHES_24H))
    )
    domain_publish_window_hours = max(
        1, int(cfg.get("domainPublishWindowHours", DOMAIN_PUBLISH_WINDOW_HOURS))
    )
    allow_repeat_source_if_needed: bool = bool(cfg.get("allowRepeatSourceIfNeeded", True))
    repeat_source_cooldown_hours = max(
        0, int(cfg.get("repeatSourceCooldownHours", DUPLICATE_SOURCE_COOLDOWN_HOURS))
    )
    enable_emergency_fallback: bool = bool(cfg.get("enableEmergencyFallback", True))
    emergency_pool_size: int = max(1, int(cfg.get("emergencyPoolSize", 8)))
    allow_offline_generation_fallback: bool = bool(
        cfg.get("allowOfflineGenerationFallback", True)
    )
    feed_timeout_seconds: int = max(
        4,
        int(
            cfg.get(
                "feedTimeoutSeconds",
                os.getenv("GLOBAL_NEWS_FEED_TIMEOUT_SECONDS", DEFAULT_FEED_TIMEOUT_SECONDS),
            )
        ),
    )
    feed_retries: int = max(
        0,
        int(
            cfg.get(
                "feedRetries",
                os.getenv("GLOBAL_NEWS_FEED_RETRIES", DEFAULT_FEED_RETRIES),
            )
        ),
    )

    state = load_json(
        state_path,
        {
            "windowStartUtc": "",
            "publishedInWindow": 0,
            "candidateCache": [],
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
    history_source_last_seen: Dict[str, dt.datetime] = {}
    for item in history:
        if not isinstance(item, dict):
            continue
        link_key = canonicalize_url(str(item.get("sourceUrl", "")))
        published = parse_datetime(str(item.get("publishedAtUtc", "")))
        if not link_key or published is None:
            continue
        previous = history_source_last_seen.get(link_key)
        if previous is None or published > previous:
            history_source_last_seen[link_key] = published
    recent_history_domains: set[str] = set()
    if domain_diversity_window_runs > 0:
        for item in history[-domain_diversity_window_runs:]:
            if not isinstance(item, dict):
                continue
            domain = normalize_ws(str(item.get("sourceDomain", ""))) or domain_of(
                str(item.get("sourceUrl", ""))
            )
            if domain:
                recent_history_domains.add(domain)
    recent_domain_counts = recent_domain_publish_counts(
        history=history,
        now=now,
        window_hours=domain_publish_window_hours,
    )
    existing_source_links, existing_title_keys = extract_existing_content_fingerprints(
        repo_root
    )

    primary_fetch_errors = 0
    google_fetch_errors = 0
    try:
        primary_candidates, primary_fetch_errors = fetch_candidates(
            source_urls=source_urls,
            trusted_domains=trusted_domains,
            exclude_terms=exclude_terms,
            feed_timeout_seconds=feed_timeout_seconds,
            feed_retries=feed_retries,
        )
    except Exception:
        primary_candidates = []
        primary_fetch_errors = len(source_urls)

    google_fallback_candidates: List[Candidate] = []
    if enable_google_news_fallback and (
        len(primary_candidates) < min_primary_before_fallback
    ):
        try:
            (
                google_fallback_candidates,
                google_fetch_errors,
            ) = fetch_google_news_fallback_candidates(
                trusted_domains=trusted_domains,
                exclude_terms=exclude_terms,
                topics=google_news_topics,
                language=google_news_language,
                region=google_news_region,
                edition=google_news_edition,
                feed_timeout_seconds=feed_timeout_seconds,
                feed_retries=feed_retries,
            )
        except Exception:
            google_fallback_candidates = []
            google_fetch_errors = len(google_news_topics)

    candidates = merge_candidates(primary_candidates, google_fallback_candidates)
    emergency_candidates: List[Candidate] = []
    if enable_emergency_fallback and not candidates:
        emergency_candidates = build_emergency_fallback_candidates(
            trusted_domains=trusted_domains,
            exclude_terms=exclude_terms,
            now=now,
            size=emergency_pool_size,
        )
        candidates = merge_candidates(candidates, emergency_candidates)
    previous_cache_records = state.get("candidateCache") or []
    if not isinstance(previous_cache_records, list):
        previous_cache_records = []
    if not previous_cache_records:
        previous_cache_records = bootstrap_cache_records_from_runs(
            runs=state.get("runs") or [],
            now=now,
        )
    merged_cache_records = merge_candidate_cache(
        previous_records=previous_cache_records,
        fresh_candidates=candidates,
        now=now,
    )
    state["candidateCache"] = merged_cache_records
    cached_candidates: List[Candidate] = []
    for record in merged_cache_records:
        candidate = candidate_from_cache_record(record)
        if candidate is not None:
            cached_candidates.append(candidate)

    source_unique_candidates: List[Candidate] = []
    filtered_candidates: List[Candidate] = []
    history_source_duplicate_candidates: List[Candidate] = []
    duplicate_skip_stats = {"historyHash": 0, "historySource": 0, "existingSource": 0, "title": 0}
    for c in candidates:
        content_hash = hashlib.sha1((c.title + "|" + c.link).encode("utf-8")).hexdigest()
        if content_hash in history_ids:
            duplicate_skip_stats["historyHash"] += 1
            continue
        source_link = canonicalize_url(c.link)
        if source_link and source_link in history_source_links:
            duplicate_skip_stats["historySource"] += 1
            history_source_duplicate_candidates.append(c)
            continue
        if source_link and source_link in existing_source_links:
            duplicate_skip_stats["existingSource"] += 1
            continue
        source_unique_candidates.append(c)
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
    eligible_candidates = apply_domain_publish_cap(
        eligible_candidates,
        domain_counts=recent_domain_counts,
        max_per_window=max_domain_publishes_24h,
    )
    shortlist = eligible_candidates[:3]

    run_report: Dict = {
        "ranAtUtc": now.isoformat().replace("+00:00", "Z"),
        "windowStartUtc": state["windowStartUtc"],
        "publishedInWindowBefore": published_in_window,
        "hoursLeftInWindow": hours_left,
        "targetMinIn12Hours": target_min,
        "hardMaxIn12Hours": hard_max,
        "forcePublishEveryRun": force_publish_every_run,
        "domainDiversityWindowRuns": domain_diversity_window_runs,
        "recentHistoryDomains": sorted(recent_history_domains),
        "recentDomainCounts": recent_domain_counts,
        "maxDomainPublishes24Hours": max_domain_publishes_24h,
        "domainPublishWindowHours": domain_publish_window_hours,
        "allowRepeatSourceIfNeeded": allow_repeat_source_if_needed,
        "repeatSourceCooldownHours": repeat_source_cooldown_hours,
        "enableEmergencyFallback": enable_emergency_fallback,
        "emergencyFallbackCandidates": len(emergency_candidates),
        "allowOfflineGenerationFallback": allow_offline_generation_fallback,
        "feedTimeoutSeconds": feed_timeout_seconds,
        "feedRetries": feed_retries,
        "networkFetchErrors": int(primary_fetch_errors + google_fetch_errors),
        "thresholdUsed": threshold_used,
        "primaryCandidatesFetched": len(primary_candidates),
        "googleFallbackCandidatesFetched": len(google_fallback_candidates),
        "candidatesFetched": len(candidates),
        "candidateCacheCount": len(cached_candidates),
        "candidatesAfterSourceDedupe": len(source_unique_candidates),
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

    if (not force_publish_every_run) and published_in_window >= hard_max:
        run_report["reason"] = (
            f"hard max reached in current 12-hour window ({published_in_window}/{hard_max})"
        )
        state.setdefault("runs", []).append(run_report)
        save_json(state_path, state)
        return run_report

    # User rule: pick top ranked #1 candidate after filters.
    selected, selected_from_diverse_domain = pick_candidate_with_domain_diversity(
        eligible_candidates,
        recent_history_domains,
    )
    fallback_used = False
    fallback_reason = ""
    fallback_min_score = max(DUPLICATE_FALLBACK_MIN_SCORE, threshold_used - 12)
    if selected is None and filtered_candidates:
        fallback_pool = [c for c in filtered_candidates if c.score >= fallback_min_score]
        fallback_pool = apply_domain_publish_cap(
            fallback_pool,
            domain_counts=recent_domain_counts,
            max_per_window=max_domain_publishes_24h,
        )
        selected, selected_from_diverse_domain = pick_candidate_with_domain_diversity(
            fallback_pool,
            recent_history_domains,
        )
        if selected is not None:
            fallback_used = True
            fallback_reason = "below_threshold"
    cache_fallback_candidates: List[Candidate] = []
    if selected is None and force_publish_every_run and cached_candidates:
        for cache_candidate in sorted(cached_candidates, key=lambda c: c.score, reverse=True):
            source_link = canonicalize_url(cache_candidate.link)
            if source_link and (
                source_link in history_source_links or source_link in existing_source_links
            ):
                continue
            title_key = slugify(normalize_ws(cache_candidate.title))
            if title_key and (
                title_key in history_title_keys or title_key in existing_title_keys
            ):
                continue
            cache_fallback_candidates.append(cache_candidate)
        cache_fallback_candidates = apply_domain_publish_cap(
            cache_fallback_candidates,
            domain_counts=recent_domain_counts,
            max_per_window=max_domain_publishes_24h,
        )
        selected, selected_from_diverse_domain = pick_candidate_with_domain_diversity(
            cache_fallback_candidates,
            recent_history_domains,
        )
        if selected is not None:
            fallback_used = True
            fallback_reason = "cache_backfill"
    if selected is None and force_publish_every_run and source_unique_candidates:
        # Mandatory hourly publish fallback: relax title-duplicate filter but never source-link duplicates.
        source_unique_candidates = apply_domain_publish_cap(
            source_unique_candidates,
            domain_counts=recent_domain_counts,
            max_per_window=max_domain_publishes_24h,
        )
        selected, selected_from_diverse_domain = pick_candidate_with_domain_diversity(
            source_unique_candidates,
            recent_history_domains,
        )
        if selected is not None:
            fallback_used = True
            fallback_reason = "title_dedupe_relaxed"
    if (
        selected is None
        and force_publish_every_run
        and allow_repeat_source_if_needed
        and history_source_duplicate_candidates
    ):
        cooldown_cutoff = now - dt.timedelta(hours=repeat_source_cooldown_hours)
        reusable_source_candidates: List[Candidate] = []
        for candidate in history_source_duplicate_candidates:
            link_key = canonicalize_url(candidate.link)
            if not link_key:
                continue
            last_seen = history_source_last_seen.get(link_key)
            if last_seen is None or last_seen <= cooldown_cutoff:
                reusable_source_candidates.append(candidate)
        reusable_source_candidates = apply_domain_publish_cap(
            reusable_source_candidates,
            domain_counts=recent_domain_counts,
            max_per_window=max_domain_publishes_24h,
        )
        selected, selected_from_diverse_domain = pick_candidate_with_domain_diversity(
            reusable_source_candidates,
            recent_history_domains,
        )
        if selected is not None:
            fallback_used = True
            fallback_reason = "source_reuse_after_cooldown"
    if selected is None:
        run_report["reason"] = (
            "no non-duplicate trusted global health/education candidate available this hour"
        )
        state.setdefault("runs", []).append(run_report)
        save_json(state_path, state)
        return run_report

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key and not allow_offline_generation_fallback:
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
    image_provider = "gemini"

    article_prompt = generate_article_prompt(selected)
    source_article_text = fetch_source_article_text(selected.link)

    generated: Dict = {}
    paraphrase_metrics: Dict[str, float] = {}
    paraphrase_ok = True
    paraphrase_failure_detail = ""
    generation_prompt = article_prompt
    article_provider_used = "gemini"
    gemini_text_error = ""
    if api_key:
        try:
            for attempt in range(1, article_attempts + 1):
                generated = gemini_text_json(api_key=api_key, model=text_model, prompt=generation_prompt)
                try:
                    validate_generated_article(generated)
                except Exception as exc:
                    if attempt >= article_attempts:
                        raise
                    generation_prompt = (
                        article_prompt
                        + "\n\nRevision required: the previous draft did not satisfy validation. "
                        f"Fix this exactly: {str(exc)}. Return valid JSON only."
                    )
                    continue
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

            if require_paraphrase and source_article_text and not paraphrase_ok:
                raise RuntimeError(
                    "Generated article failed paraphrase quality checks; "
                    + (paraphrase_failure_detail or "overlap too high")
                )
        except Exception as exc:
            gemini_text_error = str(exc)
            generated = {}

    if not generated:
        if not allow_offline_generation_fallback:
            if gemini_text_error:
                raise RuntimeError(gemini_text_error)
            raise RuntimeError("Gemini did not return article JSON")
        generated = build_offline_article_payload(selected, now)
        validate_generated_article(generated)
        paraphrase_ok = True
        paraphrase_metrics = {
            "shingleOverlapRatio": 0.0,
            "longestExactRunWords": 0.0,
            "sourceWords": float(len(source_article_text.split(" "))) if source_article_text else 0.0,
            "generatedWords": float(words_count(str(generated.get("bodyMarkdown", "")))),
        }
        article_provider_used = "offline-fallback"

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
    gemini_image_error = ""

    if image_provider in {"source_first"}:
        source_fetch = try_fetch_source_image(selected.link)
        if source_fetch is not None:
            image_bytes, image_mime, source_image_url = source_fetch
            image_provider_used = "source"
            image_sharpness = image_sharpness_score(image_bytes)

    if image_bytes is None and image_provider in {"source_first", "gemini_first", "gemini"}:
        if api_key:
            try:
                image_bytes, image_mime, image_sharpness = generate_best_gemini_image(
                    api_key=api_key,
                    model=image_model,
                    image_prompt=image_prompt,
                    attempts=image_candidates,
                )
                image_provider_used = "gemini"
            except Exception as exc:
                gemini_image_error = str(exc)
        else:
            gemini_image_error = "GEMINI_API_KEY missing"

    if image_bytes is None and image_provider == "gemini_first":
        source_fetch = try_fetch_source_image(selected.link)
        if source_fetch is not None:
            image_bytes, image_mime, source_image_url = source_fetch
            image_provider_used = "source"
            image_sharpness = image_sharpness_score(image_bytes)

    if image_bytes is None and allow_offline_generation_fallback:
        seed_text = f"{selected.title}|{selected.link}|{now.isoformat()}"
        image_bytes, image_mime, image_sharpness = generate_offline_editorial_image(seed_text)
        image_provider_used = "offline-fallback"

    if image_bytes is None:
        details = f"Gemini image error: {gemini_image_error}" if gemini_image_error else ""
        raise RuntimeError(
            "No usable image source found (Gemini + source fallback failed)"
            + (f". {details}" if details else "")
        )

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
        "coverImageCaption": "",
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
            "sourceDomain": selected.domain,
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
            "selectedFromDiverseDomain": selected_from_diverse_domain,
            "fallbackUsed": fallback_used,
            "fallbackMinScore": fallback_min_score if fallback_used else None,
            "fallbackReason": fallback_reason if fallback_used else "",
            "cacheFallbackCandidates": len(cache_fallback_candidates),
            "generatedTitle": title,
            "generatedWordCount": words_count(body_markdown),
            "mainImage": main_image,
            "generatedImageSize": {
                "width": image_size[0],
                "height": image_size[1],
            },
            "generatedImageSharpness": image_sharpness,
            "generatedImageCandidates": image_candidates,
            "articleProviderUsed": article_provider_used,
            "geminiTextError": gemini_text_error,
            "geminiImageError": gemini_image_error,
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
