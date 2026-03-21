'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Upload, Trash2, X, ImageIcon, Check } from 'lucide-react'

interface Photo {
  id: string
  title: string
  url: string
  alt: string
  created_at: string
}

export default function AdminGaleriaPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => { fetchPhotos() }, [])

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setPhotos(data.photos || [])
    } catch {
      setError('Erro ao carregar galeria')
    } finally {
      setLoading(false)
    }
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
    setPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return
    setUploading(true)
    setError('')
    setSuccess('')

    try {
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', file.name.replace(/\.[^/.]+$/, '').replace(/-|_/g, ' '))
        formData.append('alt', `Foto do Instituto Voz da Alma`)

        const res = await fetch('/api/gallery', { method: 'POST', body: formData })
        if (!res.ok) throw new Error('Erro no upload')
      }

      setSuccess(`${selectedFiles.length} foto(s) enviada(s) com sucesso!`)
      setSelectedFiles([])
      setPreviews([])
      fetchPhotos()
    } catch {
      setError('Erro ao fazer upload das fotos.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta foto?')) return
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      setPhotos(prev => prev.filter(p => p.id !== id))
    } catch {
      setError('Erro ao excluir foto.')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-5 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="font-bold text-neutral-900">Gerenciar Galeria</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 space-y-8">
        {/* Upload area */}
        <div className="rounded-3xl bg-white p-6 border border-neutral-100 shadow-sm">
          <h2 className="mb-4 font-bold text-neutral-900">Adicionar novas fotos</h2>

          {previews.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previews.map((preview, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                    <img src={preview} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={() => {
                        setSelectedFiles(prev => prev.filter((_, j) => j !== i))
                        setPreviews(prev => prev.filter((_, j) => j !== i))
                      }}
                      className="absolute top-1.5 right-1.5 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-all"
                >
                  {uploading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Upload size={15} />
                  )}
                  {uploading ? 'Enviando...' : `Enviar ${selectedFiles.length} foto(s)`}
                </button>
                <button
                  onClick={() => { setSelectedFiles([]); setPreviews([]) }}
                  className="rounded-xl border-2 border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 p-10 hover:border-primary-300 hover:bg-primary-50 transition-all">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
                <Upload size={26} className="text-primary-600" />
              </div>
              <p className="font-semibold text-neutral-700">Clique para selecionar fotos</p>
              <p className="text-sm text-neutral-400 mt-1">ou arraste os arquivos aqui</p>
              <p className="text-xs text-neutral-400 mt-2">JPG, PNG, WebP — múltiplas fotos permitidas</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="hidden"
              />
            </label>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              <Check size={14} />
              {success}
            </div>
          )}
        </div>

        {/* Gallery grid */}
        <div className="rounded-3xl bg-white p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-neutral-900">Fotos na galeria</h2>
            <span className="text-sm text-neutral-400">{photos.length} foto(s)</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="py-16 text-center">
              <ImageIcon size={36} className="mx-auto mb-3 text-neutral-300" />
              <p className="text-neutral-500">Nenhuma foto ainda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={photo.url}
                    alt={photo.alt || photo.title || ''}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-500 p-2.5 text-white hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {photo.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-white truncate">{photo.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
