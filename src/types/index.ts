// ============================================
// TIPOS GLOBAIS — Instituto Voz da Alma
// ============================================

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  modified: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails?: {
        width: number
        height: number
      }
    }
  }
  author?: {
    node: {
      name: string
      avatar?: {
        url: string
      }
    }
  }
  categories?: {
    nodes: Category[]
  }
  tags?: {
    nodes: Tag[]
  }
  seo?: {
    title: string
    metaDesc: string
    opengraphImage?: {
      sourceUrl: string
    }
  }
  readingTime?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  count?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Photo {
  id: string
  title: string
  sourceUrl: string
  altText: string
  date: string
  mediaDetails?: {
    width: number
    height: number
  }
  galleryCategory?: string
}

export interface TeamMember {
  name: string
  role: string
  crp?: string
  bio: string
  photo?: string
  specialties: string[]
}

export interface Specialty {
  title: string
  description: string
  icon: string
  slug: string
}

export interface FAQ {
  question: string
  answer: string
  category?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  consent: boolean
}

export interface SEOData {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export interface PageProps {
  params: { [key: string]: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
