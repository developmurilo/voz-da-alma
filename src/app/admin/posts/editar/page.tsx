'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff, Upload, X, Trash2 } from 'lucide-react'

function EditarPostContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        published: false,
        cover_url: '',
    })
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [coverPreview, setCoverPreview] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const CATEGORIES = ['Saúde Mental', 'Autoconhecimento', 'Ansiedade', 'Depressão', 'Relacionamentos', 'Terapia', 'Bem-estar', 'Dicas']

    useEffect(() => {
        if (!id) { router.push('/admin/dashboard'); return }
        fetchPost()
    }, [id])

    const fetchPost = async () => {
        try {
            const res = await fetch('/api/posts')
            const data = await res.json()
            const post = data.posts?.find((p: any) => p.id === id)
            if (!post) { router.push('/admin/dashboard'); return }
            setForm({
                title: post.title || '',
                slug: post.slug || '',
                excerpt: post.excerpt || '',
                content: post.content || '',
                category: post.category || '',
                author: post.author || '',
                published: post.published || false,
                cover_url: post.cover_url || '',
            })
            if (post.cover_url) setCoverPreview(post.cover_url)
        } catch {
            setError('Erro ao carregar post.')
        } finally {
            setLoading(false)
        }
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
        setSaving(true)
        setError('')
        try {
            const formData = new FormData()
            formData.append('id', id!)
            Object.entries({ ...form, published: String(published) }).forEach(([k, v]) =>
                formData.append(k, v as string)
            )
            if (coverFile) formData.append('cover', coverFile)
            const res = await fetch('/api/posts', { method: 'PUT', body: formData })
            if (res.ok) {
                router.push('/admin/dashboard')
            } else {
                const data = await res.json()
                setError(data.error || 'Erro ao salvar.')
            }
        } catch {
            setError('Erro de conexão.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
            if (res.ok) router.push('/admin/dashboard')
            else setError('Erro ao excluir post.')
        } catch {
            setError('Erro de conexão.')
        } finally {
            setDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-neutral-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
                    Carregando post...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
                <div className="mx-auto max-w-5xl px-5 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href="/admin/dashboard" className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors">
                                <ArrowLeft size={18} />
                            </Link>
                            <h1 className="font-bold text-neutral-900">Editar artigo</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleDelete} disabled={deleting}
                                className="flex items-center gap-1.5 rounded-xl border-2 border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 transition-all">
                                <Trash2 size={14} />
                                {deleting ? 'Excluindo...' : 'Excluir'}
                            </button>
                            <button onClick={() => handleSubmit(false)} disabled={saving}
                                className="flex items-center gap-1.5 rounded-xl border-2 border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 transition-all">
                                <EyeOff size={14} />
                                Salvar rascunho
                            </button>
                            <button onClick={() => handleSubmit(true)} disabled={saving}
                                className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-all">
                                {saving ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Eye size={14} />}
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-5 py-8">
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100">{error}</div>
                )}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
                    <div className="space-y-5">
                        <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
                            <input type="text" value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Título do artigo..."
                                className="w-full border-none outline-none text-2xl font-bold font-display text-neutral-900 placeholder:text-neutral-300 bg-transparent" />
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-xs text-neutral-400">URL:</span>
                                <span className="text-xs text-primary-600 font-mono">/blog/{form.slug}</span>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
                            <label className="form-label">Resumo</label>
                            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                rows={3} className="form-textarea" placeholder="Breve descrição do artigo..." />
                        </div>
                        <div className="rounded-2xl bg-white p-6 border border-neutral-100 shadow-sm">
                            <label className="form-label">Conteúdo do artigo</label>
                            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                                rows={20} className="form-textarea font-mono text-sm" style={{ minHeight: '400px' }} />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
                            <label className="form-label">Imagem de capa</label>
                            {coverPreview ? (
                                <div className="relative">
                                    <img src={coverPreview} alt="Preview" className="w-full rounded-xl object-cover aspect-video" />
                                    <button onClick={() => { setCoverFile(null); setCoverPreview(''); setForm(f => ({ ...f, cover_url: '' })) }}
                                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 p-6 hover:border-primary-300 hover:bg-primary-50 transition-all">
                                    <Upload size={24} className="mb-2 text-neutral-400" />
                                    <span className="text-sm text-neutral-500">Clique para fazer upload</span>
                                    <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                                </label>
                            )}
                        </div>
                        <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
                            <label className="form-label">Categoria</label>
                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="form-input">
                                <option value="">Sem categoria</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
                            <label className="form-label">Autor</label>
                            <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="form-input" />
                        </div>
                        <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
                            <label className="form-label">Slug (URL)</label>
                            <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="form-input font-mono text-sm" />
                        </div>
                        <div className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-sm">
                            <label className="form-label">Status atual</label>
                            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${form.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                <span className={`h-2 w-2 rounded-full ${form.published ? 'bg-green-500' : 'bg-amber-500'}`} />
                                {form.published ? 'Publicado' : 'Rascunho'}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function EditarPostPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-neutral-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
                    Carregando editor...
                </div>
            </div>
        }>
            <EditarPostContent />
        </Suspense>
    )
}