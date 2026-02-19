import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import {
  getBlogPath,
  getBlogRouteSegmentByType,
  getBlogTypeBySlug,
  type BlogRouteSegment,
} from "@/lib/blog-routes";
import { promises as fs } from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { DM_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import ArticleReadingProgress from "./ArticleReadingProgress";
import ArticleShareButtons from "./ArticleShareButtons";
import styles from "./article-template.module.css";
import { mdxComponents } from "./mdxComponents";

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

function toAbsoluteWebsiteUrl(value?: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `https://www.nivaranfoundation.org${normalized}`;
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

function getDefaultDonateLine(articleType: blogListType["type"]) {
  if (articleType === "Story") {
    return "This story reflects real families, real journeys, and real barriers. Your support helps our teams show up where care is hardest to reach.";
  }
  if (articleType === "News") {
    return "We turn urgent updates into field action. Your contribution helps us respond faster with real services, not just headlines.";
  }
  return "Distance is the disease. Your support helps us bring healthcare and education to communities where access still depends on geography.";
}

function getDefaultAuthorBio() {
  return "Nivaran Foundation runs mobile health and education programs in Nepal's rural regions, where the nearest doctor or classroom can be hours away.";
}

async function getBlogFile(slug: string) {
  const blogPath = path.join(process.cwd(), "src/blogs/global", `${slug}.mdx`);
  const fileContents = await fs.readFile(blogPath, "utf8");
  const parsed = matter(fileContents);

  return {
    content: parsed.content,
    data: parsed.data as BlogFrontmatter,
  };
}

async function getAllGlobalBlogSlugs() {
  const blogDirectory = path.join(process.cwd(), "src/blogs/global");
  const files = await fs.readdir(blogDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getSegmentForSlug(slug: string): BlogRouteSegment {
  const blogType = getBlogTypeBySlug(slug);
  if (!blogType) return "articles";
  return getBlogRouteSegmentByType(blogType);
}

export async function getStaticParamsForSegment(segment: BlogRouteSegment) {
  try {
    const allSlugs = await getAllGlobalBlogSlugs();
    return allSlugs
      .filter((slug) => getSegmentForSlug(slug) === segment)
      .map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error in getStaticParamsForSegment:", error);
    return [];
  }
}

export async function getMetadataForBlogSlug(slug: string): Promise<Metadata> {
  try {
    const { data } = await getBlogFile(slug);
    const listEntry = globalBlogs.find((blog) => blog.slug === slug);

    const title = data.title || listEntry?.title || "Untitled Blog";
    const description =
      data.subtitle ||
      listEntry?.summary ||
      "Read the latest stories and updates from Nivaran Foundation.";
    const canonicalPath = listEntry
      ? getBlogPath(listEntry)
      : `/articles/${slug}`;
    const canonical = `https://www.nivaranfoundation.org${canonicalPath}`;
    const imageUrl = toAbsoluteWebsiteUrl(data.mainImage);

    return {
      title,
      description,
      keywords: data.keywords?.split(",").map((keyword) => keyword.trim()),
      authors: [{ name: data.author || "Nivaran Foundation" }],
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: title,
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
    return {
      title: "Untitled Blog",
      description: "Read the latest stories and updates from Nivaran Foundation.",
    };
  }
}

export async function renderBlogDetailPage({
  slug,
  segment,
}: {
  slug: string;
  segment: BlogRouteSegment;
}) {
  let blogFile: Awaited<ReturnType<typeof getBlogFile>>;
  try {
    blogFile = await getBlogFile(slug);
  } catch (error) {
    console.error("Error reading blog file:", error);
    notFound();
  }

  const { content, data } = blogFile;
  const listEntry = globalBlogs.find((blog) => blog.slug === slug);
  const resolvedType = listEntry?.type || "Article";
  const resolvedSegment = getSegmentForSlug(slug);
  const resolvedPath = listEntry
    ? getBlogPath(listEntry)
    : `/articles/${slug}`;

  if (resolvedSegment !== segment) {
    permanentRedirect(resolvedPath);
  }

  const title = data.title || listEntry?.title || "Untitled Blog";
  const subtitle = data.subtitle || listEntry?.summary || "";
  const author = data.author || "Nivaran Foundation News Desk";
  const dateLabel = formatDate(data.date || listEntry?.date);
  const readTimeLabel = `${calculateReadTimeMinutes(content)} min read`;
  const location = data.location || "Nepal";
  const articleUrl = `https://www.nivaranfoundation.org${resolvedPath}`;

  const relatedBlogs = [...globalBlogs]
    .filter((blog) => blog.slug !== slug)
    .sort((a, b) => {
      const aSameType = a.type === resolvedType ? 1 : 0;
      const bSameType = b.type === resolvedType ? 1 : 0;
      return bSameType - aSameType;
    })
    .slice(0, 3);

  return (
    <div
      className={`${styles.template} ${playfairDisplay.variable} ${sourceSerif.variable} ${dmMono.variable}`}
    >
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
            <p>{data.donateLine || getDefaultDonateLine(resolvedType)}</p>
            <Link href="/donate" className={styles.donateButton}>
              Support this work
            </Link>
          </section>

          <section className={styles.authorSection}>
            <div className={styles.authorAvatar}>
              {(author.charAt(0) || "N").toUpperCase()}
            </div>
            <div>
              <div className={styles.authorName}>{author}</div>
              <p className={styles.authorBio}>
                {data.authorBio || getDefaultAuthorBio()}
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
                    href={getBlogPath(relatedBlog)}
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
