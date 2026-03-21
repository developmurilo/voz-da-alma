// ============================================
// SEO — Meta tags, Schema.org, Open Graph
// ============================================

import { Metadata } from 'next'
import { absoluteUrl } from './utils'

const SITE_NAME = 'Instituto Voz da Alma'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.institutovozdaalma.com.br'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`

export function buildMetadata({
  title,
  description,
  path = '',
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'pt_BR',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
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
  }
}

// ============================================
// SCHEMA.ORG — Dados Estruturados
// ============================================

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: SITE_NAME,
    description:
      'Instituto especializado em psicologia e saúde mental, oferecendo atendimento clínico individual, terapias e suporte emocional com profissionais qualificados.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: DEFAULT_OG_IMAGE,
    telephone: '+55-XX-XXXXX-XXXX', // Atualizar
    email: 'contato@institutovozdaalma.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua da Alma, 123', // Atualizar
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '00000-000',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      // Adicionar redes sociais quando disponíveis
      // 'https://www.instagram.com/institutovozdaalma',
    ],
    priceRange: '$$',
    medicalSpecialty: 'Psychiatry',
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'pt-BR',
  }
}

export function articleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
}: {
  title: string
  description: string
  url: string
  image?: string
  publishedTime: string
  modifiedTime: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(url),
    image: image || DEFAULT_OG_IMAGE,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(url),
    },
    inLanguage: 'pt-BR',
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}
