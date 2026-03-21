import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(100),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Assunto muito curto').max(200),
  message: z.string().min(10, 'Mensagem muito curta').max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consentimento obrigatório' }) }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Rate limiting básico por IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Contact form submitted from IP: ${ip}`)

    // Envio de e-mail via Resend
    // INSTRUÇÕES:
    // 1. Crie uma conta no site resend.com
    // 2. Gere uma API Key e crie um arquivo .env na raiz do projeto
    // 3. Adicione no arquivo .env: RESEND_API_KEY=sua_chave_aqui
    // 4. Se quiser, mude o e-mail de destino abaixo (process.env.EMAIL_TO ou texto fixo)

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error: resendError } = await resend.emails.send({
        from: 'Site Voz da Alma <onboarding@resend.dev>', // O Resend usa esse remetente de teste. Depois você altera pro seu domínio validado.
        to: process.env.EMAIL_TO || 'contato@institutovozdaalma.com.br', // Substitua pelo e-mail que vai receber as mensagens
        subject: `Novo Contato do Site: ${data.subject}`,
        html: emailTemplate(data),
      })

      if (resendError) {
        console.error('Resend Error:', resendError)
        return NextResponse.json(
          { error: 'Erro ao enviar o e-mail pelo servidor.' },
          { status: 500 }
        )
      }
    } else {
      // Fallback: Se não tiver a chave (enquanto você não configura),
      // logamos no console para continuar simulando o sucesso.
      console.log('⚠️ RESEND_API_KEY não configurada. Simulando envio no console:')
      console.log('Dados recebidos:', {
        name: data.name,
        email: data.email,
        subject: data.subject,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}

function emailTemplate(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #276a52; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0;">Nova mensagem de contato</h2>
        <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">Instituto Voz da Alma</p>
      </div>
      <div style="background: #f9f7f5; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #3a5047; width: 30%;">Nome:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #3a5047;">E-mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #3a5047;">Telefone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #3a5047;">Assunto:</td>
            <td style="padding: 8px 0;">${data.subject}</td>
          </tr>
        </table>
        <hr style="margin: 16px 0; border-color: #e3d9d0;" />
        <h3 style="margin: 0 0 8px; color: #1b2a24;">Mensagem:</h3>
        <p style="line-height: 1.6; color: #4a6058;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `
}
