import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import { getAllPosts } from '@/lib/supabase'
import { buildMetadata, faqSchema } from '@/lib/seo'
import { formatDate, truncate } from '@/lib/utils'
import {
  Heart, Brain, Users, Star, ArrowRight, Phone, ChevronDown,
  BookOpen, Sparkles, Shield, Clock, Check,
  Music, Mic, Wind, CloudRain, Activity
} from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export const metadata: Metadata = buildMetadata({
  title: 'Instituto Voz da Alma | Psicologia e Saúde Mental',
  description:
    'Instituto especializado em psicologia e saúde mental. Atendimento clínico individual, terapias e suporte emocional com profissionais qualificados. Agende sua consulta hoje.',
  path: '/',
})

const SPECIALTIES = [
  {
    icon: Brain,
    title: 'Terapia ABA',
    desc: 'Abordagem científica aplicada para desenvolvimento de habilidades em crianças no espectro autista.',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Activity,
    title: 'Terapia Ocupacional',
    desc: 'Desenvolvimento de habilidades motoras, regulação sensorial e autonomia nas atividades diárias.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Mic,
    title: 'Fonoaudiologia',
    desc: 'Estímulo e desenvolvimento da fala, articulação, linguagem e acompanhamento alimentar.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Music,
    title: 'Musicoterapia',
    desc: 'Uso de elementos musicais para o estímulo global, comunicação e interação social.',
    color: 'bg-violet-50 text-violet-600',
  },
]

const FAQS = [
  {
    question: 'O que é o Instituto Voz da Alma?',
    answer: 'Somos uma clínica interdisciplinar em Hortolândia especializada no desenvolvimento infantil. Contamos com fonoaudiologia, terapia ocupacional, musicoterapia, psicologia e intervenção ABA para apoiar crianças com autismo (TEA) e outras condições.',
  },
  {
    question: 'Com que idade o autismo pode ser identificado?',
    answer: 'Os primeiros sinais do TEA podem surgir entre 12 e 24 meses de idade. Quanto mais cedo são identificados e acompanhados, maiores são as possibilidades de intervenção e desenvolvimento de habilidades.',
  },
  {
    question: 'Como funciona a avaliação inicial?',
    answer: 'A nossa avaliação busca compreender o desenvolvimento da criança de forma ampla, englobando entrevista com os responsáveis, análise histórica e observação clínica para definirmos o melhor plano terapêutico.',
  },
  {
    question: 'Vocês atendem por convênio?',
    answer: 'Aceitamos certos convênios diretamente ou por reembolso. Recomendamos que entre em contato direto pelo WhatsApp para passarmos as informações atualizadas sobre a nossa cobertura de planos.',
  },
]

const NUMBERS = [
  { value: '500+', label: 'Pacientes atendidos' },
  { value: '8+', label: 'Anos de experiência' },
  { value: '98%', label: 'Taxa de satisfação' },
  { value: '12+', label: 'Especialidades' },
]

const HOME_FAQ_SCHEMA = faqSchema(FAQS)

export default async function HomePage() {
  let recentPosts: any[] = []
  try {
    const postsData = await getAllPosts(3)
    recentPosts = postsData.posts || []
  } catch {
    recentPosts = []
  }

  return (
    <>
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen md:min-h-[60vh] md:h-[800px] lg:h-auto lg:min-h-screen flex items-center overflow-hidden bg-deep-900">

        {/* === AREA DA IMAGEM DE BANNER === */}
        {/* A imagem vai alinhar à direita. Usamos mask-image nativo para criar um esmaecido (fade) real, do opaco ao transparente */}
        <div
          className="absolute inset-0 lg:left-[20%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, transparent 100%)',
          }}
        >
          {/* 
            INSTRUÇÃO: 
            Para usar a sua imagem, coloque ela na pasta "public/images" do projeto 
            (ex: public/images/banner-home.jpg).
            Depois, altere o `src` abaixo para: src="/images/banner-home.jpg"
          */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
            style={{ backgroundImage: 'url("/images/banner-home.png")', backgroundPosition: 'center 30%' }}
            aria-label="Música e Terapia"
          />
          {/* Leve filtro escurecedor para garantir leitura (sem afetar as bordas de transparência do mask-image) */}
          <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
        </div>

        {/* Organic shapes / Waves fluindo por cima do fundo */}
        <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-3xl float-animation pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] bg-accent-400/20 blur-3xl wave-animation pointer-events-none" />

        {/* Textura sutil estática */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="container-site relative z-10 py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent-300 animate-pulse" />
              <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
                Desenvolvimento Infantil Especializado
              </span>
            </div>

            <h1 className="mb-6 font-display font-bold text-white leading-tight">
              Apoiando o desenvolvimento do seu{' '}
              <span className="relative">
                <span className="text-accent-300">maior tesouro.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C60 4 120 2 150 4C180 6 240 10 298 6"
                    stroke="#B8D6E4"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg text-white/80 leading-relaxed font-light">
              O Instituto Voz da Alma é uma clínica interdisciplinar dedicada a transformar a vida de crianças com autismo (TEA) e neurodivergências através do acolhimento e da neurociência.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contato" className="btn-primary bg-white !text-deep-900 hover:bg-neutral-50 shadow-xl">
                <Music size={18} />
                Agendar consulta
              </Link>
              <Link href="/sobre" className="btn-outline-light">
                Conheça o Instituto
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 flex flex-wrap gap-6">
              {[
                'CRP Ativo',
                'Sigilo garantido',
                'Online e presencial',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={14} className="text-accent-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Rolar</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ===================== NUMBERS ===================== */}
      <section className="bg-white border-b border-neutral-100">
        <div className="container-site py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {NUMBERS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="mb-1 font-display text-4xl font-bold text-primary-600">{value}</p>
                <p className="text-sm text-neutral-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-4xl overflow-hidden bg-primary-100 relative">
                {/* 
                  INSTRUÇÃO: 
                  Para alterar esta foto, salve sua imagem na pasta "public/images" 
                  com o nome exato: "home-instituto.png"
                */}
                <Image
                  src="/images/home-instituto.png"
                  alt="Instituto Voz da Alma"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Floating logo transparente */}
              <div className="absolute -bottom-4 -right-4 flex items-center justify-center pointer-events-none">
                {/* 
                  INSTRUÇÃO: 
                  Coloque a sua imagem de logotipo na pasta "public/images" 
                  com o nome exato: "logo-flutuante.png"
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

            {/* Content side */}
            <div>
              <p className="section-label">A essência do Instituto</p>
              <h2 className="mb-6 font-display font-bold">
                Especialistas em {' '}
                <span className="text-gradient">Desenvolvimento Infantil</span>
              </h2>
              <p className="mb-5 text-neutral-600 leading-relaxed">
                Nossa missão é acolher crianças e famílias com excelência técnica e máxima humanidade. No Instituto Voz da Alma, trabalhamos com intervenção precoce e suporte integral para crianças com atrasos de desenvolvimento, autismo (TEA) e neurodivergências.
              </p>
              <p className="mb-8 text-neutral-600 leading-relaxed">
                Com uma equipe interdisciplinar (Fonoaudiologia, Terapia Ocupacional, Musicoterapia, Psicologia e Psicopedagogia combinada à ABA), nós unimos ciência baseada em evidências a um ambiente lúdico, empático e de acolhimento irrestrito.
              </p>

              <div className="mb-10 space-y-3">
                {[
                  'Equipe multidisciplinar especializada em TEA',
                  'Intervenções baseadas em ABA',
                  'Foco no desenvolvimento de autonomia e fala',
                  'Avaliação e treinamento parental',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <Check size={11} className="text-primary-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/sobre" className="btn-primary inline-flex">
                Nossa história completa
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SPECIALTIES ===================== */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <p className="section-label">Nossas especialidades</p>
            <h2 className="mb-4">Como podemos ajudar você</h2>
            <p className="text-neutral-500">
              Oferecemos diferentes modalidades terapêuticas para atender às suas necessidades com
              precisão e cuidado.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 group cursor-default">
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-neutral-900">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/especialidades" className="btn-secondary inline-flex">
              Ver todas as especialidades
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative overflow-hidden bg-grain">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-700" />
        <div className="container-site relative z-10 py-20 text-center">
          <p className="section-label text-accent-300">Dê o primeiro passo</p>
          <h2 className="mb-6 text-white max-w-2xl mx-auto">
            Estimulando habilidades, transformando o futuro.
          </h2>
          <p className="mb-10 text-white/75 max-w-lg mx-auto leading-relaxed">
            Nós estamos prontos para receber sua família e iniciar um plano terapêutico personalizado que respeite o tempo e as características únicas do seu filho(a).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="btn-primary bg-white !text-primary-800 hover:bg-primary-50">
              <WhatsAppIcon size={18} />
              Falar com um especialista
            </Link>
            <Link href="/blog" className="btn-outline-light">
              <BookOpen size={18} />
              Ler nosso blog
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== BLOG ===================== */}
      {recentPosts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-site">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="section-label">Blog</p>
                <h2>Conteúdo para sua saúde mental</h2>
              </div>
              <Link href="/blog" className="btn-secondary text-sm whitespace-nowrap">
                Ver todos os artigos <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recentPosts.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group">
                  <div className="aspect-video bg-primary-100 overflow-hidden">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt={post.title}
                        width={600}
                        height={340}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <BookOpen size={32} className="text-primary-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="badge-green mb-3 block w-fit text-xs">
                        {post.category}
                      </span>
                    )}
                    <h3 className="mb-2 text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {truncate(post.excerpt || '', 120)}
                    </p>
                    <p className="mt-4 text-xs text-neutral-400">{formatDate(post.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== FAQ ===================== */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <p className="section-label">Dúvidas frequentes</p>
            <h2>Perguntas que costumamos receber</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQS.map(({ question, answer }) => (
              <details key={question} className="group rounded-2xl border border-neutral-100 bg-neutral-50 overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-neutral-800 list-none">
                  {question}
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-neutral-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-neutral-600 leading-relaxed">{answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/faq" className="btn-secondary inline-flex text-sm">
              Ver todas as perguntas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
      />

      {/* ===================== WHY US ===================== */}
      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">Por que nos escolher?</p>
            <h2>Seu bem-estar é nossa prioridade</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Acolhimento Integral',
                desc: 'Apoiamos não apenas a criança, mas toda a família. Oferecemos orientação parental para transformar o lar em extensão da terapia.',
              },
              {
                icon: Activity,
                title: 'Interdisciplinaridade',
                desc: 'Nossos terapeutas avaliam e discutem cada caso em conjunto, garantindo que o plano evolutivo seja construído em sintonia.',
              },
              {
                icon: Brain,
                title: 'Práticas Baseadas em Evidências',
                desc: 'Usamos Ciência ABA aliada a recursos lúdicos, respeitando a neurodiversidade para gerar progresso mensurável e com afeto.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 rounded-[2rem] bg-white p-6 border border-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 font-bold text-neutral-900 break-words hyphens-auto">{title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </>
  )
}
