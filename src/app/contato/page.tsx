'use client'

import { useState, FormEvent } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Mail, MapPin, Clock, Send, Check, AlertCircle } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function ContatoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '', consent: false })
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Erro ao enviar. Tente novamente.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Erro de conexão. Verifique sua internet.')
      setStatus('error')
    }
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-600 pt-32 pb-16">
        {/* Wave background subtle effect */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('/images/onda-pattern.png')] bg-repeat bg-fixed pointer-events-none"
          style={{ backgroundSize: '150px' }}
        />
        <div className="container-site relative z-10 text-center max-w-2xl">
          <p className="section-label text-accent-200">Fale conosco</p>
          <h1 className="mb-4 text-white">Entre em contato</h1>
          <p className="text-white/90 text-lg leading-relaxed font-body">
            Estamos aqui para responder suas dúvidas e ajudar você a dar o primeiro passo em
            direção ao bem-estar emocional.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Info */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 border border-neutral-100 shadow-sm">
                <h2 className="mb-5 font-display text-xl font-bold text-neutral-900">
                  Informações de contato
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: WhatsAppIcon,
                      label: 'WhatsApp',
                      value: '(11) 99999-9999',
                      href: 'https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.',
                    },
                    {
                      icon: Mail,
                      label: 'E-mail',
                      value: 'contato@institutovozdaalma.com.br',
                      href: 'mailto:contato@institutovozdaalma.com.br',
                    },
                    {
                      icon: MapPin,
                      label: 'Endereço',
                      value: 'Jd Interlagos — Hortolândia, SP',
                      href: 'https://maps.google.com/?q=Jd+Interlagos,+Hortolândia,+SP',
                    },
                    {
                      icon: Clock,
                      label: 'Horário de atendimento',
                      value: 'Seg–Sex: 08h–18h | Sáb: 08h–12h',
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                        <Icon size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm text-neutral-700 hover:text-primary-600 transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-neutral-700">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRP notice */}
              <div className="rounded-2xl bg-primary-50 p-5 border border-primary-100">
                <p className="text-sm text-primary-800 leading-relaxed">
                  <strong>🔒 Sigilo garantido.</strong> Todas as informações compartilhadas são
                  tratadas com absoluta confidencialidade, conforme o Código de Ética do CFP e a
                  LGPD.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white p-8 border border-neutral-100 shadow-sm">
                <h2 className="mb-6 font-display text-xl font-bold text-neutral-900">
                  Envie uma mensagem
                </h2>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Check size={28} className="text-green-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-neutral-900">Mensagem enviada!</h3>
                    <p className="text-neutral-500 max-w-sm leading-relaxed">
                      Obrigado por entrar em contato. Nossa equipe responderá em até 24 horas.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-secondary mt-6 text-sm"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Nome completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="form-input"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="form-label">
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="form-input"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="form-label">
                          Telefone / WhatsApp
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="form-input"
                          placeholder="(XX) XXXXX-XXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="form-label">
                          Assunto <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          required
                          value={form.subject}
                          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                          className="form-input"
                        >
                          <option value="">Selecione um assunto</option>
                          <option>Agendamento de consulta</option>
                          <option>Dúvida sobre terapia</option>
                          <option>Informações sobre o instituto</option>
                          <option>Planos e valores</option>
                          <option>Outros</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label">
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="form-textarea"
                        placeholder="Descreva como podemos ajudar você..."
                      />
                    </div>

                    {/* LGPD consent */}
                    <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <label className="flex gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={form.consent}
                          onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary-600"
                        />
                        <span className="text-xs text-neutral-600 leading-relaxed">
                          Concordo com a{' '}
                          <a
                            href="/privacidade"
                            target="_blank"
                            className="font-semibold text-primary-600 hover:underline"
                          >
                            Política de Privacidade
                          </a>{' '}
                          e autorizo o Instituto Voz da Alma a utilizar meus dados pessoais para
                          responder a esta mensagem, conforme a LGPD (Lei 13.709/2018).{' '}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading' || !form.consent}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Enviar mensagem
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
