// ============================================
// AUTENTICAÇÃO DO PAINEL ADMIN
// ============================================

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)
const COOKIE_NAME = 'vda_admin_token'
const TOKEN_DURATION = '7d'

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_DURATION)
    .sign(JWT_SECRET)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyAdminToken(token)
}

export function setAdminCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })
}

export function clearAdminCookie(response: NextResponse): void {
  response.cookies.delete(COOKIE_NAME)
}

export async function withAdminAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  return handler(request)
}

// Middleware helper para rotas admin
export async function checkAdminAccess(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyAdminToken(token)
}
