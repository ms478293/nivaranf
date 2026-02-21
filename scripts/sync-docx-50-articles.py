#!/usr/bin/env python3
"""Re-sync Jan 2-Feb 20 archive articles from DOCX into MDX + listofblogs."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

try:
    import docx  # type: ignore
except Exception as exc:  # pragma: no cover
    print(f"ERROR: python-docx is required: {exc}", file=sys.stderr)
    sys.exit(1)

DEFAULT_DOCX = Path(
    "/Users/mst/Library/Application Support/Claude/local-agent-mode-sessions/"
    "32a809e8-460c-4d0c-86a4-4bb12e08dafb/9ca9d3ec-baf2-45bf-b4e6-fed31a1cbeab/"
    "local_07eafa99-3fea-4016-9d58-5f59414d605f/outputs/Nivaran_Foundation_50_Articles.docx"
)

DATE_START = "2026-01-02"
DATE_END = "2026-02-20"


@dataclass
class DocArticle:
    article_number: int
    title: str
    body_paragraphs: List[str]


@dataclass
class MdxTarget:
    path: Path
    slug: str
    date: str
    frontmatter: str
    body: str


def normalize_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def yaml_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def parse_docx_articles(docx_path: Path) -> List[DocArticle]:
    if not docx_path.exists():
        raise RuntimeError(f"DOCX not found: {docx_path}")

    document = docx.Document(str(docx_path))
    paragraphs = [p.text.strip() for p in document.paragraphs]

    articles: List[DocArticle] = []
    i = 0
    marker_re = re.compile(r"Article\s+(\d+)\s+of\s+50")

    while i < len(paragraphs):
        marker = marker_re.fullmatch(paragraphs[i])
        if not marker:
            i += 1
            continue

        article_number = int(marker.group(1))
        i += 1

        while i < len(paragraphs) and not paragraphs[i].strip():
            i += 1

        if i >= len(paragraphs):
            raise RuntimeError(f"Missing title after Article {article_number} marker")

        title = normalize_whitespace(paragraphs[i])
        i += 1

        body_paragraphs: List[str] = []
        while i < len(paragraphs):
            current = paragraphs[i].strip()
            if marker_re.fullmatch(current):
                break

            # Skip visual separators
            if current and not re.fullmatch(r"[-—━]{3,}", current):
                body_paragraphs.append(normalize_whitespace(current))
            i += 1

        if not title:
            raise RuntimeError(f"Empty title detected for Article {article_number}")
        if not body_paragraphs:
            raise RuntimeError(f"Empty body detected for Article {article_number}: {title}")

        articles.append(
            DocArticle(
                article_number=article_number,
                title=title,
                body_paragraphs=body_paragraphs,
            )
        )

    if len(articles) != 50:
        raise RuntimeError(f"Expected 50 articles in DOCX, found {len(articles)}")

    articles.sort(key=lambda item: item.article_number)
    expected_numbers = list(range(1, 51))
    found_numbers = [item.article_number for item in articles]
    if found_numbers != expected_numbers:
        raise RuntimeError(
            "Article numbering mismatch. "
            f"Expected {expected_numbers[:3]}...{expected_numbers[-3:]}, "
            f"found {found_numbers[:3]}...{found_numbers[-3:]}"
        )

    return articles


def parse_mdx_file(path: Path) -> Tuple[str, str]:
    raw = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---\n?(.*)$", raw, flags=re.S)
    if not match:
        raise RuntimeError(f"Invalid MDX frontmatter format: {path}")
    return match.group(1), match.group(2)


def get_frontmatter_value(frontmatter: str, key: str) -> str | None:
    pattern = re.compile(rf"^{re.escape(key)}:\s*\"?([^\"\n]+)\"?\s*$", re.M)
    found = pattern.search(frontmatter)
    if not found:
        return None
    return found.group(1).strip()


def collect_targets(repo_root: Path) -> List[MdxTarget]:
    blogs_dir = repo_root / "src" / "blogs" / "global"
    if not blogs_dir.exists():
        raise RuntimeError(f"Blogs directory not found: {blogs_dir}")

    targets: List[MdxTarget] = []
    for file_path in sorted(blogs_dir.glob("*.mdx")):
        frontmatter, body = parse_mdx_file(file_path)
        date_value = get_frontmatter_value(frontmatter, "date")
        if not date_value:
            continue
        if DATE_START <= date_value <= DATE_END:
            targets.append(
                MdxTarget(
                    path=file_path,
                    slug=file_path.stem,
                    date=date_value,
                    frontmatter=frontmatter,
                    body=body,
                )
            )

    targets.sort(key=lambda item: (item.date, item.slug))

    if len(targets) != 50:
        raise RuntimeError(
            f"Expected 50 target MDX files in date range {DATE_START}..{DATE_END}, found {len(targets)}"
        )

    return targets


def build_summary(paragraphs: List[str], max_chars: int = 190) -> str:
    source = normalize_whitespace(" ".join(paragraphs[:2]))
    if not source:
        return ""

    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", source) if s.strip()]
    selected: List[str] = []

    for sentence in sentences:
        if len(selected) >= 2:
            break
        candidate = normalize_whitespace(" ".join(selected + [sentence]))
        if len(candidate) <= max_chars:
            selected.append(sentence)
        else:
            break

    summary = normalize_whitespace(" ".join(selected)) if selected else source

    if len(summary) > max_chars:
        clipped = summary[: max_chars + 1]
        if " " in clipped:
            clipped = clipped.rsplit(" ", 1)[0]
        summary = clipped.rstrip(" ,;:.-") + "..."

    return summary


def word_count(text: str) -> int:
    cleaned = re.sub(r"<[^>]+>", " ", text)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    if not cleaned:
        return 0
    return len(cleaned.split(" "))


def replace_field_in_block(block: str, field: str, new_value: str) -> str:
    escaped = json.dumps(new_value, ensure_ascii=False)

    multiline_pattern = re.compile(
        rf"(^\s*{re.escape(field)}:\s*\n\s*)\"(?:[^\"\\\\]|\\\\.)*\"(,)",
        flags=re.M,
    )
    inline_pattern = re.compile(
        rf"(^\s*{re.escape(field)}:\s*)\"(?:[^\"\\\\]|\\\\.)*\"(,)",
        flags=re.M,
    )

    updated, count = multiline_pattern.subn(lambda m: f"{m.group(1)}{escaped}{m.group(2)}", block, count=1)
    if count == 1:
        return updated

    updated, count = inline_pattern.subn(lambda m: f"{m.group(1)}{escaped}{m.group(2)}", block, count=1)
    if count == 1:
        return updated

    raise RuntimeError(f"Could not find '{field}' field inside list entry block")


def find_object_block(text: str, slug: str) -> Tuple[int, int]:
    slug_token = f'slug: "{slug}"'
    slug_index = text.find(slug_token)
    if slug_index < 0:
        raise RuntimeError(f"Slug not found in listofblogs.ts: {slug}")

    start = text.rfind("{", 0, slug_index)
    if start < 0:
        raise RuntimeError(f"Could not find object start for slug: {slug}")

    depth = 0
    in_string = False
    escaped = False

    for i in range(start, len(text)):
        ch = text[i]
        if in_string:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
            continue

        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                j = end
                while j < len(text) and text[j] in " \t":
                    j += 1
                if j < len(text) and text[j] == ",":
                    end = j + 1
                return start, end

    raise RuntimeError(f"Could not find object end for slug: {slug}")


def update_listofblogs(
    list_path: Path, updates_by_slug: Dict[str, Dict[str, str]]
) -> Tuple[str, int]:
    text = list_path.read_text(encoding="utf-8")
    replaced_count = 0

    for slug, payload in updates_by_slug.items():
        start, end = find_object_block(text, slug)
        block = text[start:end]
        updated_block = replace_field_in_block(block, "title", payload["title"])
        updated_block = replace_field_in_block(updated_block, "summary", payload["summary"])
        text = text[:start] + updated_block + text[end:]
        replaced_count += 1

    list_path.write_text(text, encoding="utf-8")
    return text, replaced_count


def ensure_frontmatter_preserved_except_title(before: str, after: str) -> bool:
    strip_title = lambda fm: re.sub(r"^title:\s*.*$", "", fm, flags=re.M)
    return strip_title(before) == strip_title(after)


def sync_articles(repo_root: Path, docx_path: Path, report_path: Path) -> Dict[str, object]:
    articles = parse_docx_articles(docx_path)
    targets = collect_targets(repo_root)

    updates_by_slug: Dict[str, Dict[str, str]] = {}
    article_reports: List[Dict[str, object]] = []

    for index, article in enumerate(articles, start=1):
        target = targets[index - 1]
        if article.article_number != index:
            raise RuntimeError(
                f"Article numbering mismatch at index {index}: got {article.article_number}"
            )

        old_frontmatter = target.frontmatter
        old_main_image = get_frontmatter_value(old_frontmatter, "mainImage")

        title_line = f'title: "{yaml_escape(article.title)}"'
        updated_frontmatter, title_replacements = re.subn(
            r"^title:\s*.*$",
            title_line,
            old_frontmatter,
            count=1,
            flags=re.M,
        )

        if title_replacements != 1:
            raise RuntimeError(f"Missing or duplicate title field in: {target.path}")

        if not ensure_frontmatter_preserved_except_title(old_frontmatter, updated_frontmatter):
            raise RuntimeError(f"Frontmatter changed beyond title in: {target.path}")

        body_text = "\n\n".join(article.body_paragraphs).strip() + "\n"
        updated_content = f"---\n{updated_frontmatter}\n---\n\n{body_text}"
        target.path.write_text(updated_content, encoding="utf-8")

        new_frontmatter, new_body = parse_mdx_file(target.path)
        new_title = get_frontmatter_value(new_frontmatter, "title")
        new_main_image = get_frontmatter_value(new_frontmatter, "mainImage")

        if new_title != article.title:
            raise RuntimeError(f"Title mismatch after write in: {target.path}")
        if old_main_image != new_main_image:
            raise RuntimeError(f"mainImage changed unexpectedly in: {target.path}")

        summary = build_summary(article.body_paragraphs)
        updates_by_slug[target.slug] = {"title": article.title, "summary": summary}

        article_reports.append(
            {
                "article_number": article.article_number,
                "date": target.date,
                "slug": target.slug,
                "path": str(target.path.relative_to(repo_root)),
                "title": article.title,
                "word_count": word_count(new_body),
                "summary": summary,
                "summary_length": len(summary),
                "frontmatter_preserved_except_title": True,
                "main_image_preserved": old_main_image == new_main_image,
            }
        )

    list_path = repo_root / "src" / "blogs" / "listofblogs.ts"
    if not list_path.exists():
        raise RuntimeError(f"Missing list file: {list_path}")

    _, replaced_count = update_listofblogs(list_path, updates_by_slug)
    if replaced_count != 50:
        raise RuntimeError(f"Expected 50 list entry updates, applied {replaced_count}")

    report = {
        "timestamp": dt.datetime.utcnow().isoformat() + "Z",
        "docx_path": str(docx_path),
        "repo_root": str(repo_root),
        "date_range": {"start": DATE_START, "end": DATE_END},
        "checks": {
            "doc_articles_count": len(articles),
            "target_files_count": len(targets),
            "mapping_complete": len(articles) == 50 and len(targets) == 50,
            "list_entries_updated": replaced_count,
            "slug_file_names_unchanged": True,
            "images_preserved": True,
            "all_titles_synced": all(item["title"] for item in article_reports),
            "all_bodies_non_empty": all(item["word_count"] > 0 for item in article_reports),
            "all_articles_long_form_ge_900_words": all(
                item["word_count"] >= 900 for item in article_reports
            ),
        },
        "articles": article_reports,
    }

    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Sync 50 archive articles from DOCX into MDX files and listofblogs.ts"
    )
    parser.add_argument(
        "--repo-root",
        default=str(Path(__file__).resolve().parents[1]),
        help="Repo root path",
    )
    parser.add_argument(
        "--docx",
        default=str(DEFAULT_DOCX),
        help="Path to Nivaran_Foundation_50_Articles.docx",
    )
    parser.add_argument(
        "--report",
        default="scripts/sync-docx-50-articles-report.json",
        help="Path for validation report JSON (relative to repo root unless absolute)",
    )

    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    docx_path = Path(args.docx).resolve()
    report_path = Path(args.report)
    if not report_path.is_absolute():
        report_path = repo_root / report_path

    try:
        report = sync_articles(repo_root=repo_root, docx_path=docx_path, report_path=report_path)
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    checks = report["checks"]
    articles = report["articles"]

    print("Sync complete")
    print(f"- DOCX articles parsed: {checks['doc_articles_count']}")
    print(f"- Target MDX files updated: {checks['target_files_count']}")
    print(f"- listofblogs entries updated: {checks['list_entries_updated']}")
    print(
        "- Long-form check (>=900 words each): "
        f"{checks['all_articles_long_form_ge_900_words']}"
    )

    short_list = articles[:3] + articles[-3:]
    print("- Sample mappings:")
    for item in short_list:
        print(
            f"  {item['article_number']:02d} {item['date']} {item['slug']} "
            f"({item['word_count']} words)"
        )

    print(f"- Validation report: {report_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
