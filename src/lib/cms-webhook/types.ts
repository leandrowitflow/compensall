export type CmsWebhookEvent =
  | "post.published"
  | "post.updated"
  | "post.deleted"
  | "post.unpublished"
  | "cms.post.published"
  | "cms.post.updated"
  | "cms.post.deleted";

export type CmsWebhookAuthor = {
  name?: string | null;
  jobTitle?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type CmsWebhookTranslation = {
  title?: string | null;
  excerpt?: string | null;
  content_md?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  json_ld?: unknown;
  author?: CmsWebhookAuthor | null;
};

export type CmsWebhookPostPayload = {
  id: string;
  slug: string;
  status?: string;
  updatedAt?: string;
  cover_image_url?: string | null;
  title?: string | null;
  excerpt?: string | null;
  content_md?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  json_ld?: unknown;
  locale?: string;
  author?: CmsWebhookAuthor | null;
  translations?: Record<string, CmsWebhookTranslation>;
};

export type CmsWebhookPayload = {
  event: CmsWebhookEvent;
  siteId?: string;
  post: CmsWebhookPostPayload;
  timestamp?: string;
  signatureVersion?: string;
};
