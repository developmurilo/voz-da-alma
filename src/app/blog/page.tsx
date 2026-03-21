import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllPosts, getAllCategories } from '@/lib/supabase'
import { buildMetadata } from '@/lib/seo'
import { formatDate, truncate } from '@/lib/utils'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Artigos sobre saúde mental, psicologia, bem-estar emocional e autoconhecimento escritos por nossa equipe.',
  path: '/blog',
})

export const revalidate = 60

export default async function BlogPage({ searchParams }: { searchParams?: { categoria?: string } }) {
  let posts: any[] = []
  let categories: any[] = []

  try {
    const [postsData, catsData] = await Promise.all([getAllPosts(24), getAllCategories()])
    posts = postsData.posts || []
    categories = catsData || []
  } catch {
    posts = []
  }

  const activeCategory = searchParams?.categoria
  const filteredPosts = activeCategory
    ? posts.filter((p: any) => p.category === activeCategory)
    : posts

  return (
    <>
      <Header />
      <section className="relative overflow-hidden bg-primary-600 pt-32 pb-16">
        {/* Wave background subtle effect */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('/images/onda-pattern.png')] bg-repeat bg-fixed pointer-events-none"
          style={{ backgroundSize: '150px' }}
        />
        <div className="container-site relative z-10 text-center max-w-2xl">
          <p className="section-label text-accent-200">Conhecimento que cuida</p>
          <h1 className="mb-4 text-white">Blog do Instituto</h1>
          <p className="text-white/90 text-lg leading-relaxed font-body">
            Artigos sobre saúde mental e bem-estar escritos pela nossa equipe de especialistas.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div className="sticky top-16 z-40 bg-white border-b border-neutral-100 shadow-sm">
          <div className="container-site py-3">
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <Link href="/blog" className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${!activeCategory ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                Todos
              </Link>
              {categories.map((cat: any) => (
                <Link key={cat.slug} href={`/blog?categoria=${cat.slug}`}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${activeCategory === cat.slug ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          {filteredPosts.length === 0 ? (
            <div className="py-24 text-center">
              <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
              <h2 className="mb-2 text-xl font-bold text-neutral-700">Nenhum artigo encontrado</h2>
              <p className="text-neutral-500">Os primeiros artigos aparecerão aqui em breve.</p>
            </div>
          ) : (
            <>
              {!activeCategory && filteredPosts[0] && (
                <Link href={`/blog/${filteredPosts[0].slug}`}
                  className="group mb-10 grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-sm border border-neutral-100 lg:grid-cols-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block">
                  <div className="aspect-video lg:aspect-auto bg-primary-100 overflow-hidden">
                    {filteredPosts[0].cover_url ? (
                      <Image src={filteredPosts[0].cover_url} alt={filteredPosts[0].title}
                        width={800} height={500} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" priority />
                    ) : (
                      <div className="h-full min-h-64 w-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                        <BookOpen size={48} className="text-primary-500 opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    {filteredPosts[0].category && <span className="badge-green mb-3 block w-fit">{filteredPosts[0].category}</span>}
                    <h2 className="mb-4 text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="mb-6 text-neutral-500 leading-relaxed">{truncate(filteredPosts[0].excerpt || '', 180)}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-400">{formatDate(filteredPosts[0].published_at)}</p>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary-600">Ler artigo <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(activeCategory ? filteredPosts : filteredPosts.slice(1)).map((post: any) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group">
                    <div className="aspect-video overflow-hidden bg-primary-100">
                      {post.cover_url ? (
                        <Image src={post.cover_url} alt={post.title} width={600} height={340}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <BookOpen size={28} className="text-primary-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {post.category && <span className="badge-green mb-3 block w-fit text-xs">{post.category}</span>}
                      <h3 className="mb-2 font-bold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors">{post.title}</h3>
                      <p className="text-sm text-neutral-500 line-clamp-2">{truncate(post.excerpt || '', 120)}</p>
                      <p className="mt-4 text-xs text-neutral-400">{formatDate(post.published_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
