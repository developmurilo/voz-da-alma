// ============================================
// SUPABASE CLIENT — Instituto Voz da Alma
// ============================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente público (leitura — usado no frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente admin (escrita — usado só em API Routes server-side)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ============================================
// POSTS / BLOG
// ============================================

export async function getAllPosts(limit = 12, offset = 0) {
  const { data, error, count } = await supabaseAdmin
    .from('posts')
    .select('id, slug, title, excerpt, cover_url, category, author, published_at', { count: 'exact' })
    .eq('published', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return { posts: data || [], total: count || 0 }
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}

export async function getPostsByCategory(category: string, limit = 12) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, cover_url, category, author, published_at')
    .eq('published', true)
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, slug, title, excerpt, cover_url, published_at')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return data || []
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('posts')
    .select('category')
    .eq('published', true)
    .not('category', 'is', null)

  if (error) return []
  const unique = [...new Set((data || []).map((p: any) => p.category).filter(Boolean))]
  return unique.map(c => ({ name: c, slug: c }))
}

export async function getAllPostSlugs() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)

  if (error) return []
  return data || []
}

// ============================================
// GALERIA DE FOTOS
// ============================================

export async function getGalleryPhotos() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

// URL pública de arquivo no Supabase Storage
export function getStorageUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// ============================================
// ADMIN — operações de escrita
// ============================================

export async function createPost(post: {
  title: string
  slug: string
  content: string
  excerpt: string
  category?: string
  cover_url?: string
  author?: string
  published: boolean
}) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert({ ...post, published_at: post.published ? new Date().toISOString() : null })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(id: string, post: Partial<{
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  cover_url: string
  author: string
  published: boolean
}>) {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({
      ...post,
      updated_at: new Date().toISOString(),
      ...(post.published !== undefined && post.published
        ? { published_at: new Date().toISOString() }
        : {}),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: string) {
  const { error } = await supabaseAdmin.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function uploadPhoto(file: File, fileName: string) {
  const { data, error } = await supabaseAdmin.storage
    .from('gallery')
    .upload(fileName, file, { upsert: true })

  if (error) throw error
  return getStorageUrl('gallery', data.path)
}

export async function addGalleryPhoto(photo: {
  title: string
  url: string
  alt: string
}) {
  const { data, error } = await supabaseAdmin
    .from('gallery')
    .insert(photo)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteGalleryPhoto(id: string, storagePath?: string) {
  if (storagePath) {
    await supabaseAdmin.storage.from('gallery').remove([storagePath])
  }
  const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id)
  if (error) throw error
}

export async function getAllPostsAdmin() {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, slug, title, category, published, published_at, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
