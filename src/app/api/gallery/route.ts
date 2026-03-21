import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/auth'
import { supabaseAdmin, getStorageUrl } from '@/lib/supabase'

// GET — listar fotos (público)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ photos: data })
}

// POST — upload de foto (admin)
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async () => {
    try {
      const formData = await request.formData()
      const file  = formData.get('file') as File
      const title = formData.get('title') as string || ''
      const alt   = formData.get('alt') as string || 'Foto do Instituto Voz da Alma'

      if (!file || file.size === 0) {
        return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })
      }

      const ext = file.name.split('.').pop()
      const fileName = `foto-${Date.now()}.${ext}`
      const buffer = await file.arrayBuffer()

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('gallery')
        .upload(fileName, buffer, { contentType: file.type, upsert: true })

      if (uploadError) throw uploadError

      const url = getStorageUrl('gallery', uploadData.path)

      const { data, error } = await supabaseAdmin
        .from('gallery')
        .insert({ title, url, alt })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json({ photo: data }, { status: 201 })
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  })
}

// DELETE — remover foto (admin)
export async function DELETE(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    // Buscar URL para extrair o path do storage
    const { data: photo } = await supabaseAdmin
      .from('gallery')
      .select('url')
      .eq('id', id)
      .single()

    if (photo?.url) {
      // Extrair o path do arquivo da URL pública
      const urlParts = photo.url.split('/gallery/')
      if (urlParts[1]) {
        await supabaseAdmin.storage.from('gallery').remove([urlParts[1]])
      }
    }

    const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true })
  })
}
