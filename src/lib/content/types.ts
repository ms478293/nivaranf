export const CONTENT_TYPES = ["Article", "Story", "News", "Blog"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_STATUSES = ["draft", "published"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export type ContentRouteSegment = "articles" | "stories" | "news";

export type ContentPost = {
  id: string;
  title: string;
  slug: string;
  content_type: ContentType;
  status: ContentStatus;
  excerpt: string;
  body: string;
  author: string;
  location: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_caption: string | null;
  keywords: string[];
  featured: boolean;
  share_message: string;
  donate_line: string | null;
  author_bio: string | null;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  reading_time_minutes: number;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentPostInput = {
  title?: string;
  slug?: string;
  content_type?: ContentType;
  status?: ContentStatus;
  excerpt?: string;
  body?: string;
  author?: string;
  location?: string;
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  cover_image_caption?: string | null;
  keywords?: string[] | string;
  featured?: boolean;
  share_message?: string;
  donate_line?: string | null;
  author_bio?: string | null;
};

export type AutomatedContentFields = {
  title: string;
  slug: string;
  content_type: ContentType;
  status: ContentStatus;
  excerpt: string;
  body: string;
  author: string;
  location: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_caption: string | null;
  keywords: string[];
  featured: boolean;
  share_message: string;
  donate_line: string | null;
  author_bio: string | null;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  reading_time_minutes: number;
};
