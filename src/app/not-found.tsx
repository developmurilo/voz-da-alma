import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 to-primary-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-bold text-primary-600 mb-4">404</p>
        <h1 className="mb-3 text-2xl font-bold text-white">Página não encontrada</h1>
        <p className="mb-8 text-white/60 leading-relaxed">
          A página que você está procurando não existe ou foi movida. Mas estamos aqui
          para ajudar!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary bg-white !text-primary-800 hover:bg-primary-50">
            <Home size={16} />
            Ir para o início
          </Link>
          <Link href="/contato" className="btn-outline-light">
            <ArrowLeft size={16} />
            Falar conosco
          </Link>
        </div>
      </div>
    </div>
  )
}
