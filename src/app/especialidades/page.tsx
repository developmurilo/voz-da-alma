import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { Activity, Brain, Users, Sparkles, Baby, Compass, HeartPulse, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ESPECIALIDADES = [
  {
    icon: Brain,
    title: 'Terapia ABA',
    desc: 'Análise do Comportamento Aplicada (ABA). Abordagem científica focada no desenvolvimento de habilidades sociais, comunicação, autonomia e comportamentos adequados de aprendizagem para crianças no espectro autista.',
    tags: ['Autismo (TEA)', 'Desenvolvimento cognitivo', 'Comportamento'],
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Activity,
    title: 'Terapia Ocupacional',
    desc: 'Auxilia crianças a desenvolver habilidades motoras, sensoriais e funcionais. Foco em ampliar a coordenação motora, a independência em atividades da rotina diária e a regulação sensorial.',
    tags: ['Atividades do dia a dia', 'Integração Sensorial', 'Tônus Motor'],
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeartPulse,
    title: 'Fonoaudiologia',
    desc: 'Acompanhamento focado nos transtornos de comunicação, abrangendo o desenvolvimento e estímulo à fala, o processamento auditivo, e trabalhando recusas e intervenções no processo de alimentação.',
    tags: ['Atraso na Fala', 'Linguagem', 'Seletividade Alimentar'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Psicoterápia Infantil',
    desc: 'Espaço de acolhimento centrado na criança para demandas emocionais e comportamentais, ajudando a compreender e processar suas emoções de forma lúdica.',
    tags: ['Regulação Emocional', 'Desenvolvimento Psíquico'],
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Baby,
    title: 'Musicoterapia',
    desc: 'Abordagem terapêutica que utiliza propriedades sonoras para estimular áreas cognitivas e neurológicas, fortalecendo a interação social e as capacidades expressivas de crianças atípicas.',
    tags: ['Estimulação Cognitiva', 'Interação', 'Criatividade'],
    color: 'bg-violet-50 text-violet-600',
  },
]

export default function EspecialidadesPage() {
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
          <p className="section-label text-accent-200">O que oferecemos</p>
          <h1 className="mb-6 text-white">Nossas Especialidades</h1>
          <p className="text-lg text-white/90 leading-relaxed font-body">
            Oferecemos diferentes modalidades terapêuticas para atender às suas necessidades com
            precisão, cuidado e profissionalismo.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ESPECIALIDADES.map(({ icon: Icon, title, desc, tags, color }) => (
              <div key={title} className="card p-7">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                  <Icon size={22} />
                </div>
                <h2 className="mb-3 text-xl font-bold text-neutral-900">{title}</h2>
                <p className="mb-5 text-neutral-500 leading-relaxed text-sm">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-primary-700 p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold">Não encontrou o que procura?</h2>
            <p className="mb-6 text-white/75 max-w-xl mx-auto">
              Entre em contato conosco e indicaremos o profissional mais adequado para a sua situação.
            </p>
            <Link href="/contato" className="btn-primary bg-white !text-primary-800 hover:bg-primary-50 inline-flex">
              Falar conosco <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
