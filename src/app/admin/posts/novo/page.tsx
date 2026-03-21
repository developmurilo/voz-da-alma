'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, EyeOff, Upload, X } from 'lucide-react'

export default function NovoPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: 'Instituto Voz da Alma',
    published: false,
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: generateSlug(title) }))
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (published: boolean) => {
    if (!form.title || !form.content) {
      setError('Título e conteúdo são obrigatórios.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      Object.entries({ ...form, published: String(published) }).forEach(([k, v]) =>
        formData.append(k, v as string)
      )
      if (coverFile) formData.append('cover', coverFile)

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error || 'Erro ao salvar post.')
      }
    } catch {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  const CATEGORIES = ['Saúde Mental', 'Autoconhecimento', 'Ansiedade', 'Depressão', 'Relacionamentos', 'Terapia', 'Bem-estar', 'Dicas']

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors">
                <ArrowLeft size={18} />
              </Link>
              <h1 className="font-bold text-neutral-900">Novo artigo</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl border-2 border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 transition-all"
              >
                <EyeOff size={14} />
                Salvar rascunho
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Eye size={14} />
                )}
                Publicar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-5">
            {/* Título */}
            <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Título do artigo..."
                className="w-full border-none outline-none text-2xl font-bold font-display text-neutral-900 placeholder:text-neutral-300 bg-transparent"
              />
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-neutral-400">URL:</span>
                <span className="text-xs text-primary-600 font-mono">/blog/{form.slug || 'slug-do-artigo'}</span>
              </div>
            </div>

            {/* Resumo */}
            <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
              <label className="form-label">Resumo (aparece na listagem)</label>
              <textarea
                value={form.excerpt}
                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                rows={3}
                placeholder="Breve descrição do artigo (importante para SEO)..."
                className="form-textarea"
              />
            </div>

            {/* Conteúdo */}
            <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
              <label className="form-label">Conteúdo do artigo</label>
              <p className="mb-3 text-xs text-neutral-400">
                💡 Dica: use HTML básico para formatar — &lt;h2&gt;Título&lt;/h2&gt;, &lt;p&gt;Parágrafo&lt;/p&gt;, &lt;strong&gt;Negrito&lt;/strong&gt;
              </p>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={20}
                placeholder="<p>Escreva o conteúdo do artigo aqui...</p>&#10;&#10;<h2>Subtítulo</h2>&#10;<p>Mais conteúdo...</p>"
                className="form-textarea font-mono text-sm"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Imagem de capa */}
            <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
              <label className="form-label">Imagem de capa</label>
              {coverPreview ? (
                <div className="relative">
                  <img src={coverPreview} alt="Preview" className="w-full rounded-xl object-cover aspect-video" />
                  <button
                    onClick={() => { setCoverFile(null); setCoverPreview('') }}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 p-6 hover:border-primary-300 hover:bg-primary-50 transition-all">
                  <Upload size={24} className="mb-2 text-neutral-400" />
                  <span className="text-sm text-neutral-500">Clique para fazer upload</span>
                  <span className="text-xs text-neutral-400 mt-1">JPG, PNG, WebP</span>
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </label>
              )}
            </div>

            {/* Categoria */}
            <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
              <label className="form-label">Categoria</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="form-input"
              >
                <option value="">Sem categoria</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Autor */}
            <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
              <label className="form-label">Autor</label>
              <input
                type="text"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                className="form-input"
              />
            </div>

            {/* Slug */}
            <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
              <label className="form-label">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="form-input font-mono text-sm"
              />
              <p className="mt-1.5 text-xs text-neutral-400">Gerado automaticamente do título</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
