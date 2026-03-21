import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { Heart, Shield, Star, Users, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre o Instituto',
  description: 'Conheça o Instituto Voz da Alma — nossa história, missão, valores e o time de profissionais dedicados à sua saúde mental.',
  path: '/sobre',
})

const VALUES = [
  { icon: Heart, title: 'Acolhimento Familiar', desc: 'Cada criança e família chega com uma história única. Nosso trabalho começa recebendo vocês com empatia genuína e segurança.' },
  { icon: Shield, title: 'Base Científica', desc: 'Utilizamos práticas baseadas em evidências. Nossas terapias, como a ABA estruturada, são desenhadas com máximo rigor e excelência.' },
  { icon: Star, title: 'Desenvolvimento', desc: 'Foco incansável na aquisição de autonomia e habilidades sociais, cognitivas e motoras da criança para um futuro melhor.' },
  { icon: Users, title: 'Interdisciplinaridade', desc: 'O trabalho integrado da equipe multidisciplinar garante um planejamento terapêutico unificado e muito mais eficaz.' },
]

export default function SobrePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-700 pt-32 pb-20 min-h-[60vh] flex items-center">
        {/* Imagem de Fundo Opcional na direita */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40 mix-blend-overlay transition-opacity duration-1000"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)',
          }}
        >
          {/* 
            INSTRUÇÃO: 
            Para colocar uma foto específica na página Sobre, salve-a em public/images/banner-sobre.jpg 
            e mude o src abaixo para "/images/banner-sobre.jpg".
          */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: 'url("/images/banner-sobre.png")', backgroundPosition: 'center 30%' }}
            aria-label="Sobre o Instituto"
          />
          {/* Blend color */}
          <div className="absolute inset-0 bg-primary-800/20 mix-blend-multiply" />
        </div>

        {/* Efeitos visuais */}
        <div className="absolute top-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-accent-400/20 blur-3xl wave-animation pointer-events-none" />

        <div className="container-site relative z-10 py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="section-label text-accent-200">Nossa história</p>
            <h1 className="mb-6 text-white text-4xl lg:text-5xl">Sobre o Instituto Voz da Alma</h1>
            <p className="text-lg text-white/90 leading-relaxed font-body">
              Uma clínica interdisciplinar especializada no desenvolvimento infantil. Trabalhamos em equipe e com ciência para estimular o desenvolvimento global de crianças com autismo e condições atípicas.
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="section-label">Nossa missão</p>
              <h2 className="mb-6">Cuidando do futuro com amor e ciência</h2>
              <p className="mb-5 text-neutral-600 leading-relaxed">
                O Instituto Voz da Alma é uma clínica especializada no desenvolvimento infantil. Nossa equipe é formada por profissionais de excelência em diferentes áreas da saúde que atuam de forma totalmente integrada para apoiar crianças com autismo (TEA), atraso na fala, dificuldades de aprendizagem e outras condições do neurodesenvolvimento inerentes à infância.
              </p>
              <p className="mb-8 text-neutral-600 leading-relaxed">
                Nosso maior objetivo é promover desenvolvimento, autonomia e qualidade de vida por meio de intervenções baseadas em práticas científicas sólidas. Entendemos também que nossa clínica é, antes de tudo, um reduto de acolhimento amoroso e direcionamento ético para todas as famílias que nos procuram.
              </p>
              <div className="space-y-3">
                {[
                  'Atendimento presencial e online',
                  'Profissionais registrados no CRP',
                  'Abordagens baseadas em evidências científicas',
                  'Ambiente seguro, ético e sigiloso',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <Check size={11} className="text-primary-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-4xl bg-primary-100 flex items-center justify-center overflow-hidden relative">
                {/* 
                  INSTRUÇÃO: 
                  Para alterar esta foto ao lado do texto "Nossa missão", salve sua imagem 
                  na pasta "public/images" com o nome exato: "sobre-missao.png"
                */}
                <Image
                  src="/images/sobre-missao.png"
                  alt="Nossa missão"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 flex items-center justify-center pointer-events-none">
                {/* 
                  INSTRUÇÃO: 
                  A mesma imagem do logo flutuante será usada aqui.
                  Certifique-se de que "logo-flutuante.png" está em "public/images".
                */}
                <Image
                  src="/images/logo-flutuante.png"
                  alt="Logotipo da Marca"
                  width={120}
                  height={80}
                  className="object-contain w-[100px] h-auto drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">O que nos guia</p>
            <h2>Nossos valores</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
                  <Icon size={22} className="text-primary-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900 break-words hyphens-auto">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-800">
        <div className="container-site text-center max-w-2xl">
          <h2 className="mb-4 text-white">Pronto para dar o primeiro passo?</h2>
          <p className="mb-8 text-white/70 leading-relaxed">
            Estamos prontos para te acolher. Entre em contato e agende sua primeira consulta.
          </p>
          <Link href="/contato" className="btn-primary bg-white !text-primary-800 hover:bg-primary-50 inline-flex">
            Agendar consulta <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
