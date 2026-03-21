import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, setAdminCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Senha é obrigatória' }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured')
      return NextResponse.json({ error: 'Configuração inválida' }, { status: 500 })
    }

    // Comparação simples — para produção, use bcrypt para hash da senha
    if (password !== adminPassword) {
      // Delay para dificultar brute force
      await new Promise(r => setTimeout(r, 500))
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    const token = await createAdminToken()
    const response = NextResponse.json({ success: true }, { status: 200 })
    setAdminCookie(response, token)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
