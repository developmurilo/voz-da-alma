import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const FOOTER_LINKS = {
  institucional: [
    { href: '/sobre', label: 'Sobre o Instituto' },
    { href: '/especialidades', label: 'Especialidades' },
    { href: '/galeria', label: 'Galeria' },
  ],
  conteudo: [
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'Perguntas Frequentes' },
    { href: '/contato', label: 'Contato' },
  ],
  legal: [
    { href: '/privacidade', label: 'Política de Privacidade' },
    { href: '/cookies', label: 'Política de Cookies' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Main Footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <Image
                src="/images/logo-branca.png"
                alt="Instituto Voz da Alma"
                width={200}
                height={60}
                className="h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Transformando emoções através da música. Um espaço de acolhimento,
              expressão criativa e reequilíbrio interior para a sua voz.
            </p>
            {/* Redes Sociais */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram do Instituto Voz da Alma"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook do Instituto Voz da Alma"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20atendimentos."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp do Instituto Voz da Alma"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-neutral-500">
              Institucional
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.institucional.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.conteudo.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-neutral-500">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-primary-500" />
                <div>
                  <p className="text-sm text-neutral-300">(XX) XXXXX-XXXX</p>
                  <p className="text-xs text-neutral-500">WhatsApp disponível</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-primary-500" />
                <div>
                  <p className="text-sm text-neutral-300">contato@institutovozdaalma.com.br</p>
                </div>
              </li>
              <li className="flex gap-3 group">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-primary-500" />
                <a
                  href="https://maps.google.com/?q=Jd+Interlagos,+Hortolândia,+SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-primary-400 transition-colors"
                >
                  <p className="text-sm text-neutral-300 group-hover:text-primary-400 transition-colors">Jd Interlagos</p>
                  <p className="text-xs text-neutral-500 group-hover:text-primary-400/80 transition-colors">Hortolândia, SP</p>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="mt-0.5 flex-shrink-0 text-primary-500" />
                <div>
                  <p className="text-sm text-neutral-300">Seg–Sex: 08h–18h</p>
                  <p className="text-xs text-neutral-500">Sáb: 08h–12h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal & Mapa CTA */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-neutral-500">
              Legal & LGPD
            </h3>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.legal.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-neutral-900 p-4">
              <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
                Seus dados estão protegidos conforme a Lei Geral de Proteção de Dados (LGPD — Lei
                13.709/2018).
              </p>
              <Link
                href="/privacidade"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
              >
                Saiba mais →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {year} Instituto Voz da Alma. Todos os direitos reservados.
          </p>
          <p className="text-xs text-neutral-600 text-center">
            Desenvolvido com cuidado para a saúde mental.
          </p>
        </div>
      </div>
    </footer>
  )
}
