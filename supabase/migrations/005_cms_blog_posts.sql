-- CMS webhook blog posts (Witflow CMS publish integration)
create table if not exists cms_blog_posts (
  id uuid primary key,
  slug text unique not null,
  status text not null default 'published',
  cover_image_url text,
  primary_locale text not null default 'en',
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  cms_site_id uuid,
  translations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cms_blog_posts_slug_idx on cms_blog_posts (slug);
create index if not exists cms_blog_posts_status_idx on cms_blog_posts (status);

alter table cms_blog_posts enable row level security;
