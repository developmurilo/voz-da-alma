'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie, Shield } from 'lucide-react'

const COOKIE_KEY = 'vda_cookie_consent'

type ConsentState = 'accepted' | 'rejected' | null

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentState
    if (!stored) {
      // Pequeno delay para não travar a renderização inicial
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
    setConsent(stored)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
    // Aqui você pode inicializar Analytics após consentimento
    // window.gtag('consent', 'update', { analytics_storage: 'granted' })
  }

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected')
    setConsent('rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
      aria-describedby="cookie-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-up"
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
              <Cookie size={20} className="text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-base font-bold text-neutral-900 font-display">
                  Privacidade e Cookies
                </h2>
                <button
                  onClick={handleReject}
                  className="flex-shrink-0 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                  aria-label="Fechar aviso de cookies"
                >
                  <X size={16} />
                </button>
              </div>

              <p id="cookie-description" className="text-sm text-neutral-600 leading-relaxed mb-3">
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar
                conteúdo, conforme nossa{' '}
                <Link
                  href="/privacidade"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Política de Privacidade
                </Link>{' '}
                e em conformidade com a{' '}
                <abbr title="Lei Geral de Proteção de Dados">LGPD</abbr> (Lei 13.709/2018).
              </p>

              {expanded && (
                <div className="mb-4 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-primary-500 flex-shrink-0" />
                    <div>
                      <strong className="text-neutral-800">Cookies essenciais:</strong> Necessários
                      para o funcionamento básico do site. Não podem ser desativados.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-accent-500 flex-shrink-0" />
                    <div>
                      <strong className="text-neutral-800">Cookies de análise:</strong> Ajudam a
                      entender como os visitantes interagem com o site (Google Analytics).
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="mb-4 text-xs text-neutral-500 hover:text-primary-600 transition-colors underline"
              >
                {expanded ? 'Ver menos detalhes' : 'Ver mais detalhes'}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={handleReject}
              className="order-2 sm:order-1 rounded-full border-2 border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
            >
              Rejeitar não essenciais
            </button>
            <button
              onClick={handleAccept}
              className="order-1 sm:order-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-all shadow-sm"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
