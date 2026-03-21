import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade do Instituto Voz da Alma. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
  path: '/privacidade',
})

export default function PrivacidadePage() {
  const updatedAt = '01 de janeiro de 2025'

  return (
    <>
      <Header />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 pt-32 pb-12">
        <div className="container-site max-w-3xl">
          <p className="section-label text-accent-300">Legal & LGPD</p>
          <h1 className="text-white">Política de Privacidade</h1>
          <p className="mt-2 text-white/60 text-sm">Última atualização: {updatedAt}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <div className="prose-vda space-y-8">
            <div className="rounded-2xl bg-primary-50 p-5 border border-primary-100">
              <p className="text-sm text-primary-800 leading-relaxed">
                O Instituto Voz da Alma está comprometido com a proteção dos seus dados pessoais e
                com o cumprimento da{' '}
                <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>
                . Esta política explica como coletamos, utilizamos e protegemos suas informações.
              </p>
            </div>

            <section>
              <h2>1. Quem somos (Controlador de Dados)</h2>
              <p>
                <strong>Instituto Voz da Alma</strong>
                <br />
                E-mail: contato@institutovozdaalma.com.br
                <br />
                Endereço: [Endereço completo]
              </p>
            </section>

            <section>
              <h2>2. Quais dados coletamos</h2>
              <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
              <ul>
                <li>
                  <strong>Dados de contato:</strong> nome, e-mail, telefone — fornecidos
                  voluntariamente pelo formulário de contato.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> cookies técnicos essenciais para o
                  funcionamento do site e, com seu consentimento, cookies analíticos.
                </li>
                <li>
                  <strong>Dados de agendamento:</strong> informações fornecidas para agendar
                  consultas.
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Como utilizamos seus dados</h2>
              <p>Seus dados são utilizados exclusivamente para:</p>
              <ul>
                <li>Responder mensagens e solicitações enviadas pelo formulário de contato;</li>
                <li>Agendar e confirmar consultas;</li>
                <li>Melhorar a experiência no site (somente com seu consentimento);</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2>4. Base legal para tratamento</h2>
              <p>Tratamos seus dados com base nos seguintes fundamentos legais (art. 7º da LGPD):</p>
              <ul>
                <li>
                  <strong>Consentimento</strong> — para cookies analíticos e comunicações de
                  marketing;
                </li>
                <li>
                  <strong>Execução de contrato</strong> — para prestação dos serviços psicológicos;
                </li>
                <li>
                  <strong>Legítimo interesse</strong> — para responder mensagens de contato;
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal</strong> — para registros exigidos por lei.
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Compartilhamento de dados</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para
                fins comerciais. Podemos compartilhar dados apenas com:
              </p>
              <ul>
                <li>
                  <strong>Provedores de serviço técnico</strong> (hospedagem, e-mail) que atuam
                  como operadores sob nossas instruções;
                </li>
                <li>
                  <strong>Autoridades legais</strong>, quando exigido por lei.
                </li>
              </ul>
            </section>

            <section>
              <h2>6. Segurança dos dados</h2>
              <p>
                Adotamos medidas técnicas e administrativas para proteger seus dados: criptografia
                HTTPS, controle de acesso restrito, backups regulares e políticas de segurança
                interna.
              </p>
            </section>

            <section>
              <h2>7. Seus direitos como titular</h2>
              <p>Nos termos da LGPD, você tem direito a:</p>
              <ul>
                <li>Confirmar se tratamos seus dados;</li>
                <li>Acessar os dados que possuímos sobre você;</li>
                <li>Corrigir dados incompletos ou desatualizados;</li>
                <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>Portabilidade dos dados a outro fornecedor;</li>
                <li>Revogar consentimento a qualquer momento;</li>
                <li>Opor-se a tratamentos em desconformidade com a lei.</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato pelo e-mail:{' '}
                <a href="mailto:privacidade@institutovozdaalma.com.br">
                  privacidade@institutovozdaalma.com.br
                </a>
              </p>
            </section>

            <section>
              <h2>8. Retenção de dados</h2>
              <p>
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades informadas e
                obrigações legais. Dados de contato são eliminados após 2 anos sem interação, salvo
                obrigação legal de retenção maior.
              </p>
            </section>

            <section>
              <h2>9. Cookies</h2>
              <p>
                Utilizamos cookies técnicos essenciais (necessários para o funcionamento do site) e,
                com seu consentimento, cookies analíticos. Consulte nossa{' '}
                <a href="/cookies">Política de Cookies</a> para detalhes.
              </p>
            </section>

            <section>
              <h2>10. Contato e DPO</h2>
              <p>
                Para dúvidas sobre esta política ou para exercer seus direitos:{' '}
                <a href="mailto:privacidade@institutovozdaalma.com.br">
                  privacidade@institutovozdaalma.com.br
                </a>
              </p>
              <p>
                Você também pode encaminhar reclamações à{' '}
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autoridade Nacional de Proteção de Dados (ANPD)
                </a>
                .
              </p>
            </section>

            <section>
              <h2>11. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Notificaremos alterações
                significativas no site. A data da última atualização está indicada no topo desta
                página.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
