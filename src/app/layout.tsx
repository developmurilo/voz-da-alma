import type { Metadata } from 'next'
import { Ubuntu, Montserrat } from 'next/font/google'
import '@/styles/globals.css'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import GlobalScrollObserver from '@/components/ui/GlobalScrollObserver'

// Fontes com next/font (sem requisição externa em runtime)
const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.institutovozdaalma.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Instituto Voz da Alma | A música que liberta a alma',
    template: '%s | Instituto Voz da Alma',
  },
  description:
    'Clínica interdisciplinar especializada no desenvolvimento infantil, autismo (TEA), Terapia ABA, Fonoaudiologia, Terapia Ocupacional e Musicoterapia em Hortolândia e região.',
  keywords: [
    'autismo',
    'TEA',
    'desenvolvimento infantil',
    'Instituto Voz da Alma',
    'terapia ABA',
    'fonoaudiologia',
    'terapia ocupacional',
    'musicoterapia',
    'psicologia infantil',
    'Hortolândia',
    'Campinas',
    'clínica de autismo',
  ],
  authors: [{ name: 'Instituto Voz da Alma' }],
  creator: 'Instituto Voz da Alma',
  publisher: 'Instituto Voz da Alma',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Instituto Voz da Alma',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'seu-codigo-search-console',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${ubuntu.variable} ${montserrat.variable}`}>
      <head>
        {/* Schema.org — Dados Estruturados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#72A3B3" />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <GlobalScrollObserver />
        {children}
      </body>
    </html>
  )
}
