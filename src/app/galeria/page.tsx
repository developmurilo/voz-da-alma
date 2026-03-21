import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getGalleryPhotos } from '@/lib/supabase'
import { buildMetadata } from '@/lib/seo'
import { ImageIcon } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Galeria',
  description:
    'Conheça as instalações e o ambiente acolhedor do Instituto Voz da Alma através da nossa galeria de fotos.',
  path: '/galeria',
})

export const revalidate = 3600

export default async function GaleriaPage() {
  let photos: any[] = []

  try {
    photos = await getGalleryPhotos()
  } catch {
    photos = []
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-600 pt-32 pb-16">
        {/* Wave background subtle effect */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('/images/onda-pattern.png')] bg-repeat bg-fixed pointer-events-none"
          style={{ backgroundSize: '150px' }}
        />
        <div className="container-site relative z-10 text-center max-w-2xl">
          <p className="section-label text-accent-200">Nosso espaço</p>
          <h1 className="mb-4 text-white">Galeria de Fotos</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Conheça o ambiente acolhedor e aconchegante do Instituto Voz da Alma — um espaço
            pensado para o seu conforto e bem-estar.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-site">
          {photos.length === 0 ? (
            <div className="py-24 text-center">
              <ImageIcon size={48} className="mx-auto mb-4 text-neutral-300" />
              <h2 className="mb-2 text-xl font-bold text-neutral-700">Galeria em breve</h2>
              <p className="text-neutral-500">
                As fotos do instituto serão publicadas em breve. Volte novamente!
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {photos.map((photo: any) => (
                <div
                  key={photo.id}
                  className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 break-inside-avoid group"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.alt || photo.title || 'Foto do Instituto Voz da Alma'}
                      width={600}
                      height={400}
                      className="w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {photo.title && (
                    <p className="p-3 text-xs text-neutral-500 font-medium">{photo.title}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
