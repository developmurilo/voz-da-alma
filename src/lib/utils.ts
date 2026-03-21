import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Data não informada'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Data não informada'
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatDateShort(dateString: string): string {
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR })
}

export function formatRelativeDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { locale: ptBR, addSuffix: true })
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

export function truncate(text: string, maxLength: number): string {
  const stripped = stripHtml(text)
  if (stripped.length <= maxLength) return stripped
  return stripped.slice(0, maxLength).trim() + '…'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function buildSEOTitle(pageTitle: string, siteName = 'Instituto Voz da Alma'): string {
  return `${pageTitle} | ${siteName}`
}

export function absoluteUrl(path: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.institutovozdaalma.com.br'
  return `${siteUrl}${path}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
