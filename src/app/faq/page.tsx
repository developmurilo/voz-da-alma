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
      { question: 'O que é o Instituto Voz da Alma?', answer: 'O Instituto Voz da Alma é um espaço interdisciplinar dedicado ao desenvolvimento humano em todas as fases da vida. Temos um olhar que abrange principalmente crianças neurodivergentes, com foco no espectro autista e outros transtornos do neurodesenvolvimento.\n\nNosso objetivo é oferecer um cuidado profissional, capacitado e humanizado, acolhendo de forma individualizada cada pessoa e seu núcleo familiar.\nDesenvolvemos um plano terapêutico e através de diferentes especialidades terapêuticas, como ABA, terapia ocupacional, fonoaudiologia, psicoterapia e musicoterapia, estruturado de forma individualizada para cada paciente e baseado em evidências científicas, promovendo o desenvolvimento emocional, social, cognitivo e funcional, com atenção especial às necessidades de crianças, adolescentes e adultos.\n\nAcreditamos no cuidado intencional, no fortalecimento dos cuidadores e na construção de caminhos de desenvolvimento com respeito ao tempo e à singularidade de cada indivíduo.\n\nNo Instituto Voz da Alma, acolhemos histórias, fortalecemos vínculos e caminhamos juntos no desenvolvimento do que há de mais precioso: a pessoa e sua família.' },
      { question: 'Onde fica o Instituto Voz da Alma?', answer: 'O Instituto Voz da Alma está localizado na cidade de Hortolândia, no interior de São Paulo.\nAtendemos também famílias de diversas cidades da região metropolitana de Campinas, como Campinas, Sumaré, Monte Mor, Paulínia, Valinhos e outras cidades próximas.' },
      { question: 'Quais especialidades são oferecidas?', answer: 'Nossa clínica oferece atendimento interdisciplinar nas áreas de:\n    • Terapia ABA (Análise do Comportamento Aplicada)\n    • Terapia Ocupacional\n    • Fonoaudiologia\n    • Psicoterapia\n    • Musicoterapia\nEssa integração entre diferentes especialidades permite a construção de um plano terapêutico completo e personalizado, respeitando as necessidades específicas de cada crianças, adolescestes, adultos e suas famílias.' }
    ],
  },
  {
    categoria: 'Sobre Autismo',
    perguntas: [
      { question: 'O que é o Transtorno do Espectro Autista (TEA)?', answer: 'O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento que afeta principalmente a comunicação, a interação social e o comportamento.\nO termo "espectro" indica que as características podem variar bastante de pessoa para pessoa, tanto na intensidade quanto na forma como se manifestam.\nCada pessoa no espectro autista apresenta necessidades e habilidades diferentes, por isso o acompanhamento terapêutico deve ser individualizado.' },
      { question: 'Quais são os sinais de autismo em crianças?', answer: 'Alguns sinais que podem indicar a necessidade de uma avaliação especializada incluem:\n    • dificuldade de contato visual\n    • atraso na fala ou na comunicação\n    • dificuldade de interação social\n    • comportamentos repetitivos\n    • sensibilidade sensorial a sons, texturas ou luzes\nA presença desses sinais não significa necessariamente autismo, mas indica que uma avaliação profissional pode ser importante para compreender melhor o desenvolvimento da criança.' },
      { question: 'Com quantos anos o autismo pode ser identificado?', answer: 'Os primeiros sinais do autismo podem surgir entre 12 e 24 meses de idade.\nNo entanto, o diagnóstico pode ocorrer em diferentes fases da infância, dependendo das características apresentadas e do desenvolvimento de cada pessoa.\nAtualmente, com o avanço dos estudos, muitos adolescentes e adultos tem recebido diagnósticos, mesmo que mais tardios, e tem sido acompanhados com as terapias necessárias para ajuda-los a lidar com suas necessidades.\nQuanto mais cedo os sinais são identificados e acompanhados, maiores são as possibilidades de intervenção e desenvolvimento de habilidades importantes.' },
      { question: 'Autismo tem cura?', answer: 'O autismo não é considerado uma doença, mas sim uma condição do neurodesenvolvimento. Por isso, não se fala em cura.\nNo entanto, intervenções terapêuticas adequadas podem ajudar a desenvolver habilidades importantes, como comunicação, interação social e autonomia, contribuindo significativamente para a qualidade de vida.' },
    ],
  },
  {
    categoria: 'Sobre as Terapias',
    perguntas: [
      { question: 'O que é terapia ABA?', answer: 'A terapia ABA (Análise do Comportamento Aplicada) é uma abordagem científica amplamente utilizada no desenvolvimento de habilidades em crianças adolescentes e adultos autistas e outras condições do neurodesenvolvimento, ou até mesmo para o desenvolvimento de pessoas não diagnosticadas.\nEssa abordagem trabalha o desenvolvimento de habilidades sociais, comunicação, autonomia e comportamento por meio de estratégias estruturadas de aprendizagem.' },
      { question: 'O que faz um terapeuta ocupacional?', answer: 'A terapia ocupacional infantil ajuda crianças a desenvolver habilidades motoras, sensoriais e funcionais necessárias para as atividades do dia a dia.\nIsso inclui habilidades relacionadas à coordenação motora, autonomia, organização sensorial e participação em atividades importantes da rotina.' },
      { question: 'Quando procurar um fonoaudiólogo?', answer: 'O acompanhamento com fonoaudiologia pode ser indicado quando a criança apresenta:\n    • atraso na fala\n    • dificuldade de comunicação\n    • dificuldade na articulação das palavras\n    • dificuldades relacionadas à alimentação\nA intervenção precoce pode ajudar significativamente no desenvolvimento da comunicação e da linguagem.' },
      { question: 'O que é musicoterapia?', answer: 'A musicoterapia é uma abordagem terapêutica que utiliza elementos musicais como ritmo, melodia e som para estimular habilidades cognitivas, emocionais e sociais.\nEssa abordagem pode ser especialmente benéfica para crianças com autismo e outras condições do neurodesenvolvimento, favorecendo a comunicação, a expressão emocional e a interação social.' },
    ]
  },
  {
    categoria: 'Sobre Avaliação',
    perguntas: [
      { question: 'Como funciona a avaliação inicial?', answer: 'O processo de avaliação inicial busca compreender o desenvolvimento da criança de forma ampla.\nGeralmente envolve:\n    • entrevista com os pais ou responsáveis\n    • análise do histórico de desenvolvimento da criança\n    • observação clínica\n    • aplicação de protocolos e instrumentos específicos, quando necessário\nCom base nessa avaliação, a equipe define um plano terapêutico personalizado.' },
      { question: 'Quanto tempo dura uma avaliação?', answer: 'A avaliação pode envolver uma ou mais sessões, dependendo das necessidades da criança e das áreas que precisam ser analisadas.\nCada caso é único, e o processo é conduzido com cuidado para garantir uma compreensão completa do desenvolvimento da criança.' },
    ]
  },
  {
    categoria: 'Sobre o Tratamento',
    perguntas: [
      { question: 'Quanto tempo dura o tratamento?', answer: 'O tempo de acompanhamento varia de acordo com as necessidades e objetivos terapêuticos de cada criança.\nO plano terapêutico é acompanhado e ajustado periodicamente conforme a evolução do desenvolvimento.' },
      { question: 'As terapias são individuais?', answer: 'Sim. Na maioria dos casos, as intervenções são realizadas de forma individualizada para atender às necessidades específicas de cada criança.\nEm algumas situações, podem ocorrer atividades em conjunto ou em pequenos grupos para estimular habilidades sociais e de interação.' },
      { question: 'Os pais participam do processo terapêutico?', answer: 'Sim. A participação da família é fundamental para potencializar o desenvolvimento da criança.\nDurante o acompanhamento, os pais recebem orientações e estratégias que podem ser aplicadas também no ambiente familiar, fortalecendo o processo terapêutico.' },
    ]
  },
  {
    categoria: 'Sobre Atendimento',
    perguntas: [
      { question: 'A clínica atende convênios?', answer: 'Alguns convênios podem ser aceitos diretamente ou utilizados por meio de reembolso, dependendo do plano de saúde.\nPara obter informações atualizadas sobre convênios e formas de atendimento, recomendamos entrar em contato com nossa equipe.' },
      { question: 'Como agendar uma avaliação?', answer: 'O agendamento pode ser realizado entrando em contato com nossa equipe por meio do WhatsApp ou pelos canais de atendimento disponíveis no site.\nNossa equipe irá orientar os pais sobre o processo de avaliação inicial e os próximos passos.' },
      { question: 'O Instituto Voz da Alma atende crianças de quais cidades?', answer: 'O Instituto Voz da Alma está localizado em Hortolândia, mas atende famílias de diversas cidades da região, como:\n    • Hortolândia\n    • Campinas\n    • Sumaré\n    • Monte Mor\n    • Paulínia\n    • Valinhos\nAlém dessas cidades, também atendemos famílias de outras localidades da região metropolitana de Campinas.' },
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
                        <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{answer}</p>
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
