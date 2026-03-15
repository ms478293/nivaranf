import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import {
  getBlogPath,
  getBlogRouteSegmentByType,
  getBlogTypeBySlug,
  type BlogRouteSegment,
} from "@/lib/blog-routes";
import { getSiteVariantConfig, type SiteVariant } from "@/lib/site-variant";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import {
  buildCanonicalPath,
  getRouteSegmentForContentType,
} from "@/lib/content/automation";
import {
  getPublishedBlogItemsBySegment,
  getPublishedContentPostBySlug,
} from "@/lib/content/posts";
import { promises as fs } from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { DM_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import { cache } from "react";
import ArticleReadingProgress from "./ArticleReadingProgress";
import ArticleShareButtons from "./ArticleShareButtons";
import styles from "./article-template.module.css";
import { mdxComponents } from "./mdxComponents";
import { isNonNepalCandidate } from "@/lib/content/blogFilters";

const STATIC_BLOG_DIRECTORIES = [
  path.join(process.cwd(), "src/blogs/global"),
  path.join(process.cwd(), "src/blogs/usa"),
];

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--article-font-display",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--article-font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--article-font-mono",
});

type BlogFrontmatter = {
  title?: string;
  subtitle?: string;
  date?: string;
  author?: string;
  mainImage?: string;
  keywords?: string;
  location?: string;
  coverImageAlt?: string;
  coverImageCaption?: string;
  shareMessage?: string;
  donateLine?: string;
  authorBio?: string;
};

type StaticBlogEntry = {
  slug: string;
  content: string;
  data: BlogFrontmatter;
};

const TYPE_BADGE_LABELS: Record<blogListType["type"], string> = {
  Story: "Field Story",
  Collaboration: "Collaboration",
  News: "News",
  Opinion: "Opinion",
  Analysis: "Analysis",
  Project: "Project",
  Article: "Article",
};

const TYPE_BADGE_CLASSES: Record<blogListType["type"], string> = {
  Story: styles.typeStory,
  Collaboration: styles.typeCollaboration,
  News: styles.typeNews,
  Opinion: styles.typeOpinion,
  Analysis: styles.typeAnalysis,
  Project: styles.typeProject,
  Article: styles.typeArticle,
};

function toAbsoluteWebsiteUrl(siteUrl: string, value?: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${siteUrl}${normalized}`;
}

function ensureBrandInTitle(
  rawTitle: string | undefined,
  siteName: string,
  fallbackTitle: string,
) {
  const baseTitle = (rawTitle || "").trim();
  if (!baseTitle) return fallbackTitle;
  if (baseTitle.toLowerCase().includes(siteName.toLowerCase())) return baseTitle;
  return `${baseTitle} | ${siteName}`;
}

function buildMetadataTitle(
  rawTitle: string | undefined,
  siteVariant: SiteVariant,
  siteName: string,
  fallbackTitle: string,
) {
  if (siteVariant === "main") {
    return ensureBrandInTitle(rawTitle, siteName, fallbackTitle);
  }

  const title = (rawTitle || "").trim();
  return title || fallbackTitle;
}

function cleanDescription(rawDescription?: string) {
  const value = (rawDescription || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).trimEnd()}...`;
}

function pickBestDescription(...candidates: Array<string | undefined>) {
  const cleaned = candidates
    .map((candidate) => cleanDescription(candidate))
    .filter(Boolean);

  if (cleaned.length === 0) return "";

  const preferred = cleaned.find((candidate) => candidate.length >= 110);
  if (preferred) return preferred;

  return [...cleaned].sort((a, b) => b.length - a.length)[0];
}

function buildExcerptFromContent(content?: string) {
  if (!content) return "";
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleanDescription(plainText);
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "Date unavailable";
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return dateValue;
  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateISO(dateValue?: string): string | undefined {
  if (!dateValue) return undefined;
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  return parsedDate.toISOString();
}

function calculateReadTimeMinutes(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return 1;

  const words = text.split(" ").length;
  return Math.max(1, Math.round(words / 220));
}

function getDefaultDonateLine(
  articleType: blogListType["type"],
  siteVariant: SiteVariant,
) {
  const siteConfig = getSiteVariantConfig(siteVariant);

  if (siteVariant !== "main") {
    return siteConfig.articleDefaultDonateLine;
  }

  if (articleType === "Story") {
    return "This story reflects real families, real journeys, and real barriers. Your support helps our teams show up where care is hardest to reach.";
  }
  if (articleType === "News") {
    return "We turn urgent updates into field action. Your contribution helps us respond faster with real services, not just headlines.";
  }
  return "Distance is the disease. Your support helps us bring healthcare and education to communities where access still depends on geography.";
}

function getDefaultAuthorBio(siteVariant: SiteVariant) {
  return getSiteVariantConfig(siteVariant).articleDefaultAuthorBio;
}

function getSchemaType(articleType: blogListType["type"]) {
  if (articleType === "News") return "NewsArticle";
  if (articleType === "Story") return "Article";
  return "BlogPosting";
}

function getSchemaAuthor(authorName: string, siteConfig: ReturnType<typeof getSiteVariantConfig>) {
  if (/desk|foundation|nivaran/i.test(authorName)) {
    return {
      "@type": "Organization",
      name: authorName,
      url: siteConfig.siteUrl,
    };
  }

  return {
    "@type": "Person",
    name: authorName,
  };
}

function getDisplayTypeFromContentType(contentType: string): blogListType["type"] {
  if (contentType === "Story") return "Story";
  if (contentType === "News") return "News";
  return "Article";
}

const getAllStaticBlogEntries = cache(async (): Promise<StaticBlogEntry[]> => {
  const entries: StaticBlogEntry[] = [];
  const seen = new Set<string>();

  for (const directory of STATIC_BLOG_DIRECTORIES) {
    try {
      const files = await fs.readdir(directory);

      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;

        const slug = file.replace(/\.mdx$/, "");
        if (seen.has(slug)) continue;

        const blogPath = path.join(directory, file);
        const fileContents = await fs.readFile(blogPath, "utf8");
        const parsed = matter(fileContents);

        seen.add(slug);
        entries.push({
          slug,
          content: parsed.content,
          data: parsed.data as BlogFrontmatter,
        });
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  return entries;
});

const getBlogFile = cache(async (slug: string) => {
  const entries = await getAllStaticBlogEntries();
  const match = entries.find((entry) => entry.slug === slug);

  if (!match) {
    throw new Error(`Missing static blog file for slug "${slug}"`);
  }

  return {
    content: match.content,
    data: match.data,
  };
});

function isVisibleOnSiteVariant(
  siteVariant: SiteVariant,
  candidate: {
    title?: string;
    summary?: string;
    slug: string;
    author?: string;
    location?: string | null;
    keywords?: string[] | string | null;
  },
) {
  if (siteVariant !== "global") return true;

  return isNonNepalCandidate({
    title: candidate.title || "",
    summary: candidate.summary || "",
    slug: candidate.slug,
    author: candidate.author || "",
    location: candidate.location,
    keywords: candidate.keywords,
  });
}

function getSegmentForSlug(slug: string): BlogRouteSegment {
  const blogType = getBlogTypeBySlug(slug);
  if (!blogType) return "articles";
  return getBlogRouteSegmentByType(blogType);
}

export async function getStaticParamsForSegment(
  segment: BlogRouteSegment,
  options: { siteVariant?: SiteVariant } = {},
) {
  try {
    const siteVariant = options.siteVariant || "main";
    const staticEntries = await getAllStaticBlogEntries();
    const staticParams = staticEntries
      .filter((entry) => getSegmentForSlug(entry.slug) === segment)
      .filter((entry) =>
        isVisibleOnSiteVariant(siteVariant, {
          title: entry.data.title,
          summary: entry.data.subtitle,
          slug: entry.slug,
          author: entry.data.author,
          location: entry.data.location,
          keywords: entry.data.keywords,
        }),
      )
      .map((entry) => ({ slug: entry.slug }));
    const portalParams = (await getPublishedBlogItemsBySegment(segment))
      .filter((blog) => isVisibleOnSiteVariant(siteVariant, blog))
      .map((blog) => ({ slug: blog.slug }));

    const uniqueSlugs = Array.from(
      new Set([...staticParams, ...portalParams].map((entry) => entry.slug))
    );
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error in getStaticParamsForSegment:", error);
    return [];
  }
}

export async function getMetadataForBlogSlug(
  slug: string,
  options: { siteVariant?: SiteVariant } = {},
): Promise<Metadata> {
  try {
    const siteVariant = options.siteVariant || "main";
    const siteConfig = getSiteVariantConfig(siteVariant);
    const listEntry = globalBlogs.find((blog) => blog.slug === slug);
    const dynamicPost = listEntry
      ? null
      : await getPublishedContentPostBySlug(slug);
    if (dynamicPost) {
      if (
        !isVisibleOnSiteVariant(siteVariant, {
          title: dynamicPost.title,
          summary: dynamicPost.excerpt,
          slug: dynamicPost.slug,
          author: dynamicPost.author,
          location: dynamicPost.location,
          keywords: dynamicPost.keywords,
        })
      ) {
        return {
          title: siteConfig.articleFallbackTitle,
          description: siteConfig.articleFallbackDescription,
          robots: {
            index: false,
            follow: false,
          },
        };
      }

      const title = buildMetadataTitle(
        dynamicPost.seo_title || dynamicPost.title,
        siteVariant,
        siteConfig.siteName,
        siteConfig.articleFallbackTitle,
      );
      const description = pickBestDescription(
        dynamicPost.seo_description ||
          dynamicPost.excerpt,
        buildExcerptFromContent(dynamicPost.body),
        siteConfig.articleFallbackDescription
      );
      const canonical =
        siteVariant === "main" && dynamicPost.canonical_url
          ? dynamicPost.canonical_url
          : `${siteConfig.siteUrl}${buildCanonicalPath(
              dynamicPost.content_type,
              dynamicPost.slug
            )}`;
      const imageUrl = toAbsoluteWebsiteUrl(
        siteConfig.siteUrl,
        dynamicPost.cover_image_url || "",
      );
      const publishedTime = dynamicPost.published_at || undefined;
      const modifiedTime = dynamicPost.updated_at || undefined;
      const authorName =
        dynamicPost.author || siteConfig.articleAuthorFallback;

      return {
        title,
        description,
        keywords: dynamicPost.keywords,
        authors: [{ name: authorName }],
        alternates: {
          canonical,
        },
        openGraph: {
          siteName: siteConfig.siteName,
          title,
          description,
          url: canonical,
          type: "article",
          publishedTime,
          modifiedTime,
          authors: [authorName],
          section: dynamicPost.content_type,
          images: imageUrl
            ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: dynamicPost.title || `${siteConfig.siteName} article cover image`,
              },
            ]
            : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          creator: "@NivaranOrg",
          site: "@NivaranOrg",
          images: imageUrl ? [imageUrl] : undefined,
        },
      };
    }

    const { data, content } = await getBlogFile(slug);

    if (
      !isVisibleOnSiteVariant(siteVariant, {
        title: data.title || listEntry?.title,
        summary: data.subtitle || listEntry?.summary,
        slug,
        author: data.author || listEntry?.author,
        location: data.location,
        keywords: data.keywords,
      })
    ) {
      return {
        title: siteConfig.articleFallbackTitle,
        description: siteConfig.articleFallbackDescription,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = buildMetadataTitle(
      data.title || listEntry?.title || "Untitled Blog",
      siteVariant,
      siteConfig.siteName,
      siteConfig.articleFallbackTitle,
    );
    const description = pickBestDescription(
      data.subtitle,
      listEntry?.summary,
      buildExcerptFromContent(content),
      siteConfig.articleFallbackDescription
    );
    const canonicalPath = listEntry
      ? getBlogPath(listEntry)
      : `/articles/${slug}`;
    const canonical = `${siteConfig.siteUrl}${canonicalPath}`;
    const imageUrl = toAbsoluteWebsiteUrl(siteConfig.siteUrl, data.mainImage);
    const publishedTime = data.date || listEntry?.date;
    const authorName = data.author || siteConfig.articleAuthorFallback;

    return {
      title,
      description,
      keywords: data.keywords?.split(",").map((keyword) => keyword.trim()),
      authors: [{ name: authorName }],
      alternates: {
        canonical,
      },
      openGraph: {
        siteName: siteConfig.siteName,
        title,
        description,
        url: canonical,
        type: "article",
        publishedTime,
        authors: [authorName],
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: data.coverImageAlt || title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@NivaranOrg",
        site: "@NivaranOrg",
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch (error) {
    console.error("Error in getMetadataForBlogSlug:", error);
    const siteVariant = options.siteVariant || "main";
    const siteConfig = getSiteVariantConfig(siteVariant);
    const listEntry = globalBlogs.find((blog) => blog.slug === slug);
    if (listEntry) {
      const title = buildMetadataTitle(
        listEntry.title,
        siteVariant,
        siteConfig.siteName,
        siteConfig.articleFallbackTitle,
      );
      const description = pickBestDescription(
        listEntry.summary,
        siteConfig.articleFallbackDescription
      );

      return {
        title,
        description,
        alternates: {
          canonical: `${siteConfig.siteUrl}${getBlogPath(listEntry)}`,
        },
      };
    }
    return {
      title: siteConfig.articleFallbackTitle,
      description: siteConfig.articleFallbackDescription,
    };
  }
}

export async function renderBlogDetailPage({
  slug,
  segment,
  siteVariant = "main",
}: {
  slug: string;
  segment: BlogRouteSegment;
  siteVariant?: SiteVariant;
}) {
  const siteConfig = getSiteVariantConfig(siteVariant);
  const listEntry = globalBlogs.find((blog) => blog.slug === slug);
  const dynamicPost = listEntry
      ? null
    : await getPublishedContentPostBySlug(slug);
  let content = "";
  let data: BlogFrontmatter = {};
  let resolvedType: blogListType["type"] = listEntry?.type || "Article";
  let resolvedSegment: BlogRouteSegment = getSegmentForSlug(slug);
  let resolvedPath = listEntry ? getBlogPath(listEntry) : `/articles/${slug}`;
  let readTimeMinutes = 1;
  const sitePathPrefix =
    siteVariant === "global"
      ? await getSubdomainPathPrefix("global")
      : siteVariant === "usa"
        ? await getSubdomainPathPrefix("usa")
        : "";

  if (dynamicPost) {
    content = dynamicPost.body;
    data = {
      title: dynamicPost.title,
      subtitle: dynamicPost.excerpt,
      date: dynamicPost.published_at || dynamicPost.updated_at,
      author: dynamicPost.author,
      mainImage: dynamicPost.cover_image_url || undefined,
      keywords: dynamicPost.keywords.join(", "),
      location: dynamicPost.location,
      coverImageAlt: dynamicPost.cover_image_alt || undefined,
      coverImageCaption: dynamicPost.cover_image_caption || undefined,
      shareMessage: dynamicPost.share_message || undefined,
      donateLine: dynamicPost.donate_line || undefined,
      authorBio: dynamicPost.author_bio || undefined,
    };
    resolvedType = getDisplayTypeFromContentType(dynamicPost.content_type);
    resolvedSegment = getRouteSegmentForContentType(dynamicPost.content_type);
    resolvedPath = buildCanonicalPath(dynamicPost.content_type, dynamicPost.slug);
    readTimeMinutes = dynamicPost.reading_time_minutes;
  } else {
    try {
      const blogFile = await getBlogFile(slug);
      content = blogFile.content;
      data = blogFile.data;
      readTimeMinutes = calculateReadTimeMinutes(content);
    } catch (error) {
      console.error("Error reading blog file:", error);
      notFound();
    }
  }

  if (
    !isVisibleOnSiteVariant(siteVariant, {
      title: data.title || listEntry?.title,
      summary: data.subtitle || listEntry?.summary,
      slug,
      author: data.author || listEntry?.author,
      location: data.location,
      keywords: data.keywords,
    })
  ) {
    notFound();
  }

  if (resolvedSegment !== segment) {
    permanentRedirect(withSubdomainPrefix(sitePathPrefix, resolvedPath));
  }

  const title = data.title || listEntry?.title || "Untitled Blog";
  const subtitle = data.subtitle || listEntry?.summary || "";
  const author = data.author || siteConfig.articleAuthorFallback;
  const dateLabel = formatDate(data.date || listEntry?.date);
  const readTimeLabel = `${readTimeMinutes} min read`;
  const location = data.location || siteConfig.articleDefaultLocation;
  const articleUrl = `${siteConfig.siteUrl}${resolvedPath}`;
  const ctaHref = withSubdomainPrefix(
    sitePathPrefix,
    siteConfig.articleCtaHref,
  );

  const keywordList = data.keywords
    ? data.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
    : undefined;
  const publishedIso = formatDateISO(data.date || listEntry?.date);
  const modifiedIso = dynamicPost?.updated_at
    ? formatDateISO(dynamicPost.updated_at)
    : publishedIso;

  // Generate Article JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": getSchemaType(resolvedType),
    headline: title,
    description: subtitle,
    image: data.mainImage
      ? toAbsoluteWebsiteUrl(siteConfig.siteUrl, data.mainImage)
      : undefined,
    author: getSchemaAuthor(author || siteConfig.organizationName, siteConfig),
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}/logo.png`,
        width: 1200,
        height: 665,
      },
    },
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: TYPE_BADGE_LABELS[resolvedType],
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: keywordList,
  };

  const staticRelatedBlogs = [...globalBlogs]
    .filter((blog) => blog.slug !== slug)
    .filter((blog) => isVisibleOnSiteVariant(siteVariant, blog))
    .sort((a, b) => {
      const aSameType = a.type === resolvedType ? 1 : 0;
      const bSameType = b.type === resolvedType ? 1 : 0;
      return bSameType - aSameType;
    });
  const dynamicRelatedBlogs = (await getPublishedBlogItemsBySegment(resolvedSegment))
    .filter((blog) => isVisibleOnSiteVariant(siteVariant, blog));

  const relatedBySlug = new Map<string, blogListType>();
  staticRelatedBlogs.forEach((blog) => relatedBySlug.set(blog.slug, blog));
  dynamicRelatedBlogs.forEach((blog) => relatedBySlug.set(blog.slug, blog));

  const relatedBlogs = Array.from(relatedBySlug.values())
    .filter((blog) => blog.slug !== slug)
    .sort((a, b) => {
      const aSameType = a.type === resolvedType ? 1 : 0;
      const bSameType = b.type === resolvedType ? 1 : 0;
      if (aSameType !== bSameType) return bSameType - aSameType;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <div
      className={`${styles.template} ${playfairDisplay.variable} ${sourceSerif.variable} ${dmMono.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleReadingProgress />

      <article>
        <header className={styles.hero}>
          <div
            className={`${styles.contentType} ${TYPE_BADGE_CLASSES[resolvedType]}`}
          >
            {TYPE_BADGE_LABELS[resolvedType]}
          </div>

          <h1 className={styles.articleTitle}>{title}</h1>

          {subtitle && <p className={styles.articleSubtitle}>{subtitle}</p>}

          <div className={styles.articleMeta}>
            <span className={styles.metaItem}>
              <strong>{author}</strong>
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>{dateLabel}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>{location}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>{readTimeLabel}</span>
          </div>
        </header>

        <div className={styles.coverImageWrap}>
          {data.mainImage ? (
            <>
              <Image
                src={data.mainImage}
                alt={data.coverImageAlt || title}
                width={1200}
                height={675}
                quality={100}
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                className={styles.coverImage}
              />
              {data.coverImageCaption && (
                <p className={styles.imageCaption}>{data.coverImageCaption}</p>
              )}
            </>
          ) : (
            <div className={styles.coverImagePlaceholder}>
              <span>Cover Image</span>
            </div>
          )}
        </div>

        <section className={styles.articleBody}>
          <section className={styles.mdxContent}>
            <MDXRemote source={content} components={mdxComponents} />
          </section>

          <div className={styles.shareSection}>
            <span className={styles.shareLabel}>If this moved you, share it</span>
            <ArticleShareButtons
              url={articleUrl}
              title={title}
              shareMessage={data.shareMessage}
            />
          </div>

          <section className={styles.donateSection}>
            <p>{data.donateLine || getDefaultDonateLine(resolvedType, siteVariant)}</p>
            <Link href={ctaHref} className={styles.donateButton}>
              {siteConfig.articleCtaLabel}
            </Link>
          </section>

          <section className={styles.authorSection}>
            <div className={styles.authorAvatar}>
              <Image
                src="/small_logo.png"
                alt="Nivaran logo"
                width={40}
                height={40}
                className={styles.authorLogo}
              />
            </div>
            <div>
              <div className={styles.authorName}>{author}</div>
              <p className={styles.authorBio}>
                {data.authorBio || getDefaultAuthorBio(siteVariant)}
              </p>
              <div className={styles.authorLinks}>
                <a
                  href="https://www.instagram.com/nivaran.foundation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61584248211038"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/company/nivaran-foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/NivaranOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>
            </div>
          </section>

          {relatedBlogs.length > 0 && (
            <section className={styles.relatedSection}>
              <div className={styles.relatedHeading}>More from the field</div>
              <div className={styles.relatedGrid}>
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    className={styles.relatedCard}
                    href={withSubdomainPrefix(
                      sitePathPrefix,
                      getBlogPath(relatedBlog),
                    )}
                    key={relatedBlog.slug}
                  >
                    <span className={styles.relatedCardType}>
                      {TYPE_BADGE_LABELS[relatedBlog.type]}
                    </span>
                    <div className={styles.relatedCardTitle}>
                      {relatedBlog.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </article>
    </div>
  );
}
