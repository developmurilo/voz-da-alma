'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/especialidades', label: 'Especialidades' },
  {
    label: 'Conteúdo',
    children: [
      { href: '/blog', label: 'Blog' },
      { href: '/galeria', label: 'Galeria' },
    ],
  },
  { href: '/faq', label: 'FAQ' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100'
          : 'bg-transparent'
      )}
    >
      <div className="container-site">
        <div className="flex h-18 items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative h-12 w-48"
            aria-label="Instituto Voz da Alma — Ir para a página inicial"
          >
            {/* 
              INSTRUÇÃO PARA O LOGO DINÂMICO: 
              - public/images/logo-branca.png (usado quando a tela está no topo, fundo escuro)
              - public/images/logo-preta.png (usado quando a página rola, fundo branco)
            */}
            <Image
              src={scrolled ? "/images/logo-preta.png" : "/images/logo-branca.png"}
              alt="Instituto Voz da Alma Logo"
              fill
              className="object-contain object-left transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {NAV_LINKS.map(link => {
              if (link.children) {
                const open = dropdown === link.label
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setDropdown(open ? null : link.label)}
                      className={cn(
                        'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                        scrolled
                          ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                      aria-expanded={open}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn('transition-transform', open && 'rotate-180')}
                      />
                    </button>
                    {open && (
                      <div className="absolute top-full left-0 mt-2 min-w-[160px] rounded-xl bg-white shadow-lg border border-neutral-100 overflow-hidden">
                        {link.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive(link.href!)
                      ? scrolled
                        ? 'text-primary-700 bg-primary-50 font-semibold'
                        : 'text-white bg-white/20 font-semibold'
                      : scrolled
                        ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contato"
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200',
                scrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                  : 'bg-white text-primary-700 hover:bg-white/90 shadow-md'
              )}
            >
              Agendar consulta
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden rounded-lg p-2 transition-colors',
              scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
            )}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white shadow-xl">
          <nav className="container-site py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => {
              if (link.children) {
                return (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                      {link.label}
                    </p>
                    {link.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive(link.href!)
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-3 pt-3 border-t border-neutral-100">
              <Link
                href="/contato"
                className="block rounded-full bg-primary-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Agendar consulta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
