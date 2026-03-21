import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { ArrowRight, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Nossa Equipe',
  description: 'Conheça os psicólogos e especialistas do Instituto Voz da Alma. Profissionais qualificados e comprometidos com a sua saúde mental.',
  path: '/equipe',
})

// ✏️ EDITE AQUI — substitua pelos dados reais da equipe
const EQUIPE = [
  {
    nome: 'Dra. Nome da Psicóloga',
    cargo: 'Psicóloga Clínica',
    crp: 'CRP 00/00000',
    bio: 'Especialista em Terapia Cognitivo-Comportamental com mais de 8 anos de experiência. Atua com adultos em processos de ansiedade, depressão e desenvolvimento pessoal.',
    especialidades: ['TCC', 'Ansiedade', 'Depressão', 'Desenvolvimento Pessoal'],
    foto: null, // Substituir pela URL da foto quando disponível
  },
  {
    nome: 'Dr. Nome do Psicólogo',
    cargo: 'Psicólogo Clínico',
    crp: 'CRP 00/00000',
    bio: 'Especialista em terapia de casal e família com formação em abordagem sistêmica. Atua com casais em crises relacionais e famílias em conflito.',
    especialidades: ['Terapia de Casal', 'Terapia Familiar', 'Conflitos'],
    foto: null,
  },
  {
    nome: 'Dra. Nome da Especialista',
    cargo: 'Psicóloga Infantil',
    crp: 'CRP 00/00000',
    bio: 'Especialista em psicologia infantil e do desenvolvimento. Atua com crianças de 3 a 12 anos com dificuldades emocionais, comportamentais e de aprendizagem.',
    especialidades: ['Psicologia Infantil', 'Desenvolvimento', 'Aprendizagem'],
    foto: null,
  },
]

export default function EquipePage() {
  return (
    <>
      <Header />

      <section className="relative overflow-hidden bg-primary-600 pt-32 pb-20">
        {/* Wave background subtle effect */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('/images/onda-pattern.png')] bg-repeat bg-fixed pointer-events-none"
          style={{ backgroundSize: '150px' }}
        />
        <div className="container-site relative z-10 text-center max-w-3xl">
          <p className="section-label text-accent-200">Quem cuida de você</p>
          <h1 className="mb-6 text-white">Nossa Equipe</h1>
          <p className="text-lg text-white/90 leading-relaxed font-body">
            Profissionais qualificados, éticos e apaixonados pelo que fazem. Cada membro da
            nossa equipe foi escolhido pelo compromisso com a excelência e o cuidado humano.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EQUIPE.map(({ nome, cargo, crp, bio, especialidades, foto }) => (
              <div key={nome} className="card overflow-hidden">
                {/* Foto */}
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  {foto ? (
                    <img src={foto} alt={nome} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-3xl font-bold font-display text-white">
                      {nome.split(' ').find(w => !['Dr.', 'Dra.'].includes(w))?.[0] || 'P'}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h2 className="mb-1 text-xl font-bold text-neutral-900">{nome}</h2>
                  <p className="text-sm font-semibold text-primary-600 mb-1">{cargo}</p>
                  <p className="text-xs text-neutral-400 mb-4">{crp}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-5">{bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {especialidades.map(e => (
                      <span key={e} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="mb-2 text-neutral-500">Quer conhecer melhor nossa equipe ou agendar com um profissional?</p>
            <Link href="/contato" className="btn-primary inline-flex mt-4">
              Entrar em contato <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
