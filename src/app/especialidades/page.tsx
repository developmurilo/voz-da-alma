import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { Activity, Brain, Heart, Mic, Music, ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Especialidades | Instituto Voz da Alma',
  description: 'Conheça nossas abordagens terapêuticas e especialidades, focadas no desenvolvimento integral e acolhimento familiar.',
  path: '/especialidades',
})

const ESPECIALIDADES = [
  {
    icon: Brain,
    title: 'Terapia ABA',
    desc: 'A ABA utiliza estratégias como reforço positivo, ensino estruturado e aprendizagem em contextos naturais para desenvolver habilidades sociais, comunicativas, acadêmicas e de autonomia. Não é um protocolo único, mas um conjunto de técnicas individualizadas, adaptadas às necessidades de cada pessoa. Embora seja mais conhecida pela aplicação no autismo, a ABA também é utilizada no desenvolvimento infantil típico, dificuldades de aprendizagem, habilidades sociais, autonomia, orientação de pais e no desenvolvimento de adolescentes e adultos. Isso porque é baseada em princípios científicos do comportamento humano, aplicáveis a diferentes contextos e fases da vida.',
    tags: ['Estratégias Estruturadas', 'Desenvolvimento', 'Autonomia', 'Comportamento'],
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Activity,
    title: 'Terapia Ocupacional',
    desc: 'A Terapia Ocupacional promove o desenvolvimento da autonomia e da funcionalidade em diferentes fases da vida, apoiando habilidades sensoriais, motoras, cognitivas e sociais. Com abordagem baseada em evidências, o cuidado é individualizado e focado na participação significativa nas atividades do cotidiano.',
    tags: ['Autonomia', 'Atividades do Cotidiano', 'Funcionalidade'],
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Mic,
    title: 'Fonoaudiologia',
    desc: 'A Fonoaudiologia atua no desenvolvimento da comunicação, linguagem, fala e alimentação, apoiando crianças, adolescentes e adultos. As intervenções são individualizadas e baseadas em evidências científicas, promovendo funcionalidade e qualidade de vida.',
    tags: ['Comunicação', 'Linguagem', 'Alimentação'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Music,
    title: 'Musicoterapia',
    desc: 'A Musicoterapia utiliza a música como ferramenta terapêutica para promover desenvolvimento emocional, cognitivo, social e comunicativo em diferentes fases da vida, com intervenções estruturadas e baseadas em evidências.',
    tags: ['Estimulação Cognitiva', 'Interação', 'Desenvolvimento Emocional'],
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Heart,
    title: 'Psicoterapia',
    desc: 'A Psicoterapia oferece um espaço seguro e acolhedor para crianças, adolescentes e adultos, promovendo desenvolvimento emocional, habilidades sociais e bem-estar psicológico, por meio de abordagens fundamentadas em evidências científicas.',
    tags: ['Bem-estar Psicológico', 'Regulação Emocional', 'Acolhimento'],
    color: 'bg-rose-50 text-rose-600',
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
          <div className="max-w-3xl mx-auto space-y-4">
            {ESPECIALIDADES.map(({ icon: Icon, title, desc, tags, color }) => (
              <details key={title} className="group card overflow-hidden cursor-pointer">
                <summary className="flex items-center justify-between gap-4 p-5 md:p-6 list-none select-none outline-none">
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                      <Icon size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-0">{title}</h2>
                  </div>
                  <ChevronDown
                    size={20}
                    className="flex-shrink-0 text-neutral-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 md:px-6 pb-6 pt-0">
                  <div className="border-t border-neutral-100 flex flex-col pt-5 mt-1">
                    <p className="mb-5 text-neutral-600 leading-relaxed text-sm md:text-base">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
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
