import { redirect } from 'next/navigation'
import Link from 'next/link'
import NextImage from 'next/image'
import { getAdminSession } from '@/lib/auth'
import { getAllPostsAdmin, getGalleryPhotos } from '@/lib/supabase'
import { PenSquare, Image, LogOut, ExternalLink, FileText, Eye, EyeOff, Trash2, Plus } from 'lucide-react'

export const metadata = {
  title: 'Painel Admin | Instituto Voz da Alma',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const isAuthenticated = await getAdminSession()
  if (!isAuthenticated) redirect('/admin/login')

  let posts: any[] = []
  let photos: any[] = []

  try {
    ;[posts, photos] = await Promise.all([getAllPostsAdmin(), getGalleryPhotos()])
  } catch { }

  const publishedCount = posts.filter((p: any) => p.published).length
  const draftCount = posts.filter((p: any) => !p.published).length

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NextImage
                src="/images/logo-preta.png"
                alt="Instituto Voz da Alma"
                width={150}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <div className="hidden sm:block border-l border-neutral-200 pl-3">
                <p className="text-xs font-medium text-neutral-500">Painel Administrativo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <ExternalLink size={14} />
                Ver site
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Posts publicados', value: publishedCount, color: 'text-primary-600', bg: 'bg-primary-50' },
            { label: 'Rascunhos', value: draftCount, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Fotos na galeria', value: photos.length, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Total de posts', value: posts.length, color: 'text-neutral-600', bg: 'bg-neutral-100' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-2xl ${bg} p-5`}>
              <p className={`text-3xl font-bold font-display ${color}`}>{value}</p>
              <p className="text-xs text-neutral-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/posts/novo"
            className="group flex items-center gap-4 rounded-2xl bg-primary-600 p-5 text-white hover:bg-primary-700 transition-all shadow-sm"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
              <PenSquare size={22} />
            </div>
            <div>
              <p className="font-bold text-lg">Novo artigo</p>
              <p className="text-sm text-white/70">Escrever e publicar no blog</p>
            </div>
            <Plus size={20} className="ml-auto opacity-70" />
          </Link>

          <Link
            href="/admin/galeria"
            className="group flex items-center gap-4 rounded-2xl bg-violet-600 p-5 text-white hover:bg-violet-700 transition-all shadow-sm"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Image size={22} />
            </div>
            <div>
              <p className="font-bold text-lg">Adicionar fotos</p>
              <p className="text-sm text-white/70">Upload para a galeria</p>
            </div>
            <Plus size={20} className="ml-auto opacity-70" />
          </Link>
        </div>

        {/* Posts list */}
        <div className="rounded-3xl bg-white border border-neutral-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-neutral-400" />
              <h2 className="font-bold text-neutral-900">Artigos do blog</h2>
            </div>
            <Link
              href="/admin/posts/novo"
              className="flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition-colors"
            >
              <Plus size={14} />
              Novo
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={36} className="mx-auto mb-3 text-neutral-300" />
              <p className="text-neutral-500 font-medium">Nenhum artigo ainda</p>
              <p className="text-sm text-neutral-400 mt-1">Clique em "Novo artigo" para começar</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-50">
              {posts.map((post: any) => (
                <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {post.category && (
                        <span className="text-xs text-neutral-400">{post.category}</span>
                      )}
                      <span className="text-xs text-neutral-300">•</span>
                      <span className="text-xs text-neutral-400">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${post.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                      {post.published ? <Eye size={10} /> : <EyeOff size={10} />}
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                    <Link
                      href={`/admin/posts/editar?id=${post.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
