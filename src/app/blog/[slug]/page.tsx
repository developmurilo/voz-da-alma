import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/supabase'
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { formatDate, estimateReadingTime, truncate } from '@/lib/utils'
import { ArrowLeft, Clock, User, BookOpen, Share2 } from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((p: any) => ({ slug: p.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: truncate(post.excerpt || post.content || '', 160),
    path: `/blog/${post.slug}`,
    ogImage: post.cover_url,
    type: 'article',
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    author: post.author,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = post.category
    ? await getRelatedPosts(post.slug, post.category, 3)
    : []

  const readingTime = estimateReadingTime(post.content || '')

  const ARTICLE_SCHEMA = articleSchema({
    title: post.title,
    description: truncate(post.excerpt || '', 160),
    url: `/blog/${post.slug}`,
    image: post.cover_url,
    publishedTime: post.published_at,
    modifiedTime: post.updated_at || post.published_at,
    author: post.author || 'Instituto Voz da Alma',
  })

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 pt-28 pb-16">
        <div className="container-site max-w-4xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={14} />Voltar ao blog
          </Link>
          {post.category && <span className="badge-green mb-4 block w-fit">{post.category}</span>}
          <h1 className="mb-6 text-white leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
            {post.author && <div className="flex items-center gap-1.5"><User size={14} />{post.author}</div>}
            <div className="flex items-center gap-1.5"><Clock size={14} />{formatDate(post.published_at)}</div>
            <div className="flex items-center gap-1.5"><BookOpen size={14} />{readingTime} min de leitura</div>
          </div>
        </div>
      </section>

      {post.cover_url && (
        <div className="bg-white">
          <div className="container-site max-w-4xl -mt-8">
            <div className="aspect-video overflow-hidden rounded-3xl shadow-xl">
              <Image src={post.cover_url} alt={post.title} width={900} height={500}
                className="h-full w-full object-cover" priority />
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-12 lg:py-16">
        <div className="container-site">
          <div className="mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] max-w-5xl">
            <article>
              <div className="prose-vda" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="mt-10 flex items-center gap-4 rounded-2xl bg-primary-50 p-6 border border-primary-100">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white font-display">
                  {(post.author || 'I').charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-neutral-900">{post.author || 'Instituto Voz da Alma'}</p>
                  <p className="text-sm text-neutral-500">Instituto Voz da Alma</p>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white">
                  <p className="mb-2 text-lg font-bold font-display">Precisa de apoio?</p>
                  <p className="mb-5 text-sm text-white/75">Nossa equipe está pronta para acolher você.</p>
                  <Link href="/contato" className="block rounded-xl bg-white py-2.5 text-center text-sm font-bold text-primary-800 hover:bg-primary-50 transition-colors">
                    Agendar consulta
                  </Link>
                </div>
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                  <p className="mb-3 text-sm font-bold text-neutral-700 flex items-center gap-2"><Share2 size={14} />Compartilhar</p>
                  <div className="flex gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-green-500 py-2 text-center text-xs font-semibold text-white hover:bg-green-600">WhatsApp</a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700">Facebook</a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-site">
            <h2 className="mb-8 text-2xl font-bold">Artigos relacionados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related: any) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="card overflow-hidden group">
                  <div className="aspect-video bg-primary-100 overflow-hidden">
                    {related.cover_url ? (
                      <Image src={related.cover_url} alt={related.title} width={400} height={225}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <BookOpen size={28} className="text-primary-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors">{related.title}</h3>
                    <p className="text-xs text-neutral-400 mt-2">{formatDate(related.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  )
}
