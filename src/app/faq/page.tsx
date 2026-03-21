import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata, faqSchema } from '@/lib/seo'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Perguntas Frequentes',
  description: 'Tire suas dúvidas sobre psicologia, terapia, agendamento e como funciona o atendimento no Instituto Voz da Alma.',
  path: '/faq',
})

const FAQS = [
  {
    categoria: 'Sobre o Instituto',
    perguntas: [
      { question: 'O que é o Instituto Voz da Alma?', answer: 'O Instituto Voz da Alma é uma clínica interdisciplinar especializada no desenvolvimento infantil. Nossa equipe é formada por profissionais de diferentes áreas da saúde que atuam de forma integrada para apoiar crianças com desafios no desenvolvimento, como autismo, atraso na fala, dificuldades de aprendizagem, oferecendo um acompanhamento terapêutico personalizado.' },
      { question: 'Onde fica o Instituto Voz da Alma?', answer: 'O Instituto Voz da Alma está localizado na cidade de Hortolândia, no interior de São Paulo. Atendemos também famílias de diversas cidades da região metropolitana de Campinas, como Campinas, Sumaré, Monte Mor, Paulínia, Valinhos e outras próximas.' },
      { question: 'Quais especialidades são oferecidas?', answer: 'Nossa clínica oferece atendimento nas áreas de Terapia ABA (Análise do Comportamento Aplicada), Terapia Ocupacional, Fonoaudiologia, Psicoterapia e Musicoterapia. Essa integração permite a construção de um plano terapêutico completo e personalizado.' },
    ],
  },
  {
    categoria: 'Sobre Autismo (TEA)',
    perguntas: [
      { question: 'O que é o Transtorno do Espectro Autista (TEA)?', answer: 'O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento que afeta principalmente a comunicação, a interação social e o comportamento. Cada criança no espectro autista apresenta necessidades diferentes, por isso o acompanhamento deve ser individual.' },
      { question: 'Quais são os sinais de autismo em crianças?', answer: 'Alguns sinais incluem dificuldade de contato visual, atraso na fala, dificuldade de interação social, comportamentos repetitivos e sensibilidade sensorial (sons, texturas, luzes). Uma avaliação profissional é importante para compreender o desenvolvimento.' },
      { question: 'Com quantos anos o autismo pode ser identificado?', answer: 'Os primeiros sinais podem surgir entre 12 e 24 meses de idade. Quanto mais cedo são identificados, maiores as possibilidades de intervenção e desenvolvimento de habilidades importantes.' },
      { question: 'Autismo tem cura?', answer: 'O autismo não é uma doença, mas sim uma condição do neurodesenvolvimento, por isso não se fala em cura. Intervenções terapêuticas adequadas ajudam a desenvolver comunicação, interação social e autonomia, contribuindo para a qualidade de vida.' },
    ],
  },
  {
    categoria: 'Sobre as Terapias',
    perguntas: [
      { question: 'O que é terapia ABA?', answer: 'A terapia ABA (Análise do Comportamento Aplicada) é uma abordagem científica amplamente utilizada no desenvolvimento de habilidades em crianças com autismo. Trabalha o desenvolvimento social, comunicação, autonomia e comportamento por meio de estratégias de aprendizagem estruturadas.' },
      { question: 'O que faz um terapeuta ocupacional?', answer: 'A terapia ocupacional infantil ajuda crianças a desenvolver habilidades motoras, sensoriais e funcionais para as atividades do dia a dia, como coordenação motora, autonomia e organização sensorial.' },
      { question: 'Quando procurar um fonoaudiólogo?', answer: 'O acompanhamento pode ser indicado quando a criança apresenta atraso na fala, dificuldade de comunicação, dificuldade na articulação das palavras ou dificuldades relacionadas à alimentação.' },
      { question: 'O que é musicoterapia?', answer: 'A musicoterapia é uma abordagem terapêutica que utiliza elementos musicais (ritmo, melodia, som) para estimular habilidades cognitivas, emocionais e sociais, favorecendo a expressão e comunicação.' },
    ]
  },
  {
    categoria: 'Avaliação e Tratamento',
    perguntas: [
      { question: 'Como funciona a avaliação inicial?', answer: 'A avaliação busca compreender o desenvolvimento da criança de forma ampla, envolvendo entrevista com os pais, análise do histórico, observação clínica e aplicação de protocolos. A partir disso, define-se o plano terapêutico.' },
      { question: 'Quanto tempo dura uma avaliação e o tratamento?', answer: 'A avaliação pode durar uma ou mais sessões. O tempo do tratamento varia conforme as necessidades da criança, sendo o plano ajustado periodicamente.' },
      { question: 'As terapias são individuais?', answer: 'Sim. Na maioria dos casos são individualizadas para atender as necessidades específicas de cada criança. Em algumas situações podem ocorrer atividades em pequenos grupos.' },
      { question: 'Os pais participam do processo terapêutico?', answer: 'Sim. A participação da família é fundamental. Os pais recebem orientações e estratégias que podem ser aplicadas no ambiente familiar para potencializar o processo.' },
    ]
  },
  {
    categoria: 'Atendimento',
    perguntas: [
      { question: 'A clínica atende convênios?', answer: 'Alguns convênios podem ser aceitos diretamente ou utilizados por meio de reembolso. Recomendamos entrar em contato com nossa equipe para obter informações atualizadas.' },
      { question: 'Como agendar uma avaliação?', answer: 'O agendamento pode ser realizado entrando em contato conosco pelo WhatsApp ou pelos canais do site. Orientaremos sobre os próximos passos.' },
    ]
  }
]

const ALL_FAQS = FAQS.flatMap(c => c.perguntas)
const FAQ_SCHEMA = faqSchema(ALL_FAQS)

export default function FaqPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <section className="relative overflow-hidden bg-primary-600 pt-32 pb-20">
        {/* Wave background subtle effect */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('/images/onda-pattern.png')] bg-repeat bg-fixed pointer-events-none"
          style={{ backgroundSize: '150px' }}
        />
        <div className="container-site relative z-10 text-center max-w-3xl">
          <p className="section-label text-accent-200">Tire suas dúvidas</p>
          <h1 className="mb-6 text-white">Perguntas Frequentes</h1>
          <p className="text-lg text-white/90 leading-relaxed font-body">
            Reunimos as dúvidas mais comuns sobre psicologia, terapia e nosso atendimento.
            Não encontrou o que procura? Entre em contato!
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-site max-w-3xl">
          <div className="space-y-10">
            {FAQS.map(({ categoria, perguntas }) => (
              <div key={categoria}>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary-600">
                  {categoria}
                </h2>
                <div className="space-y-3">
                  {perguntas.map(({ question, answer }) => (
                    <details key={question} className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden shadow-sm">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-neutral-800 list-none">
                        {question}
                        <ChevronDown size={18} className="flex-shrink-0 text-neutral-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="border-t border-neutral-50 px-5 pb-5 pt-4">
                        <p className="text-sm text-neutral-600 leading-relaxed">{answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-white border border-neutral-100 p-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-neutral-900">Ainda tem dúvidas?</h2>
            <p className="mb-6 text-neutral-500">Estamos prontos para responder qualquer pergunta.</p>
            <Link href="/contato" className="btn-primary inline-flex">
              Falar conosco <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
