-- ============================================
-- SCHEMA DO BANCO DE DADOS — Instituto Voz da Alma
-- Execute este SQL no Supabase SQL Editor
-- supabase.com → seu projeto → SQL Editor → New query
-- ============================================

-- Extensão para UUIDs
create extension if not exists "uuid-ossp";

-- ============================================
-- TABELA: posts (Blog)
-- ============================================
create table if not exists public.posts (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  content     text,
  excerpt     text,
  cover_url   text,
  category    text,
  author      text default 'Instituto Voz da Alma',
  published   boolean default false,
  published_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Índices para performance e SEO
create index if not exists posts_slug_idx       on public.posts (slug);
create index if not exists posts_published_idx  on public.posts (published, published_at desc);
create index if not exists posts_category_idx   on public.posts (category);

-- ============================================
-- TABELA: gallery (Fotos)
-- ============================================
create table if not exists public.gallery (
  id          uuid primary key default uuid_generate_v4(),
  title       text,
  url         text not null,
  alt         text,
  created_at  timestamptz default now()
);

-- ============================================
-- SEGURANÇA (Row Level Security)
-- ============================================

-- Posts: qualquer um pode LER posts publicados
alter table public.posts enable row level security;

create policy "Posts publicados são públicos"
  on public.posts for select
  using (published = true);

-- Gallery: qualquer um pode VER as fotos
alter table public.gallery enable row level security;

create policy "Galeria é pública"
  on public.gallery for select
  using (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket para fotos da galeria
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Bucket para imagens de capa dos posts
insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do nothing;

-- Política: qualquer um pode ver as imagens públicas
create policy "Imagens públicas - galeria"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "Imagens públicas - covers"
  on storage.objects for select
  using (bucket_id = 'covers');

-- ============================================
-- DADOS DE EXEMPLO (opcional)
-- Descomente para inserir posts de teste
-- ============================================

-- insert into public.posts (title, slug, content, excerpt, category, author, published, published_at)
-- values (
--   'Bem-vindos ao Blog do Instituto Voz da Alma',
--   'bem-vindos-ao-blog',
--   '<p>Este é o primeiro artigo do nosso blog. Aqui você encontrará conteúdo sobre saúde mental, bem-estar emocional e autoconhecimento.</p>',
--   'Este é o primeiro artigo do nosso blog sobre saúde mental e bem-estar emocional.',
--   'Saúde Mental',
--   'Instituto Voz da Alma',
--   true,
--   now()
-- );

