import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Webhook chamado pelo WordPress após publicação de conteúdo
// Configure no WP com o plugin "WP Webhooks" ou "Advanced Custom Fields"
// POST para: https://seusite.com/api/revalidate?secret=TOKEN

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { type, slug } = body

    // Revalidar baseado no tipo de conteúdo
    if (type === 'post' && slug) {
      revalidatePath(`/blog/${slug}`)
    }

    // Sempre revalidar a listagem do blog e a home
    revalidatePath('/blog')
    revalidatePath('/')

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Erro na revalidação' }, { status: 500 })
  }
}

// GET para teste manual em desenvolvimento
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/blog')

  return NextResponse.json({
    revalidated: true,
    message: 'Cache limpo com sucesso',
    timestamp: new Date().toISOString(),
  })
}
