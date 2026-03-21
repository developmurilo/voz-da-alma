import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.institutovozdaalma.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/especialidades`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/galeria`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]

  let postPages: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllPostSlugs()
    postPages = slugs.map((p: any) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at || p.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { }

  return [...staticPages, ...postPages]
}
