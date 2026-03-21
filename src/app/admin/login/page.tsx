'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Senha incorreta. Tente novamente.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <Image
                src="/images/logo-preta.png"
                alt="Instituto Voz da Alma"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Acesso Restrito
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="form-label">
                Senha de acesso
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="form-input pr-10"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verificando...
                </>
              ) : (
                'Entrar no painel'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-400">
            Acesso restrito a administradores autorizados
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  )
}
