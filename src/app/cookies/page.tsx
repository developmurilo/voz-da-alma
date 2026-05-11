import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Política de Cookies',
  description: 'Entenda como o Instituto Voz da Alma utiliza cookies e como você pode gerenciá-los.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 pt-32 pb-12">
        <div className="container-site max-w-3xl">
          <p className="section-label text-accent-300">Legal & LGPD</p>
          <h1 className="text-white">Política de Cookies</h1>
          <p className="mt-2 text-white/60 text-sm">Última atualização: 01 de janeiro de 2025</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <div className="prose-vda space-y-8">
            <section>
              <h2>O que são cookies?</h2>
              <p>Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles permitem que o site lembre suas preferências e melhore sua experiência de navegação.</p>
            </section>
            <section>
              <h2>Quais cookies utilizamos</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="border border-neutral-200 p-3 text-left font-semibold">Cookie</th>
                      <th className="border border-neutral-200 p-3 text-left font-semibold">Tipo</th>
                      <th className="border border-neutral-200 p-3 text-left font-semibold">Finalidade</th>
                      <th className="border border-neutral-200 p-3 text-left font-semibold">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-200 p-3">vda_admin_token</td>
                      <td className="border border-neutral-200 p-3">Essencial</td>
                      <td className="border border-neutral-200 p-3">Autenticação do painel administrativo</td>
                      <td className="border border-neutral-200 p-3">7 dias</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-200 p-3">vda_cookie_consent</td>
                      <td className="border border-neutral-200 p-3">Essencial</td>
                      <td className="border border-neutral-200 p-3">Armazena sua preferência de cookies</td>
                      <td className="border border-neutral-200 p-3">1 ano</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-200 p-3">_ga</td>
                      <td className="border border-neutral-200 p-3">Analítico</td>
                      <td className="border border-neutral-200 p-3">Google Analytics — estatísticas de visitas</td>
                      <td className="border border-neutral-200 p-3">2 anos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2>Como gerenciar cookies</h2>
              <p>Você pode aceitar ou recusar cookies não essenciais pelo banner que aparece na sua primeira visita. Para cookies já aceitos, você pode limpá-los nas configurações do seu navegador a qualquer momento.</p>
            </section>
            <section>
              <h2>Contato</h2>
              <p>Dúvidas sobre cookies? Entre em contato: <a href="mailto:contato@institutovozdaalma.com.br">contato@institutovozdaalma.com.br</a></p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
