import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/auth'
import { supabaseAdmin, getStorageUrl } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, slug, title, excerpt, cover_url, category, author, published, published_at, created_at, content')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async () => {
    try {
      const formData = await request.formData()
      const title = formData.get('title') as string
      const slug = formData.get('slug') as string
      const content = formData.get('content') as string
      const excerpt = formData.get('excerpt') as string
      const category = formData.get('category') as string
      const author = formData.get('author') as string
      const published = formData.get('published') === 'true'
      const coverFile = formData.get('cover') as File | null

      if (!title || !slug) return NextResponse.json({ error: 'Título e slug são obrigatórios' }, { status: 400 })

      let cover_url = ''
      if (coverFile && coverFile.size > 0) {
        const ext = coverFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${ext}`
        const buffer = await coverFile.arrayBuffer()
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('covers').upload(fileName, buffer, { contentType: coverFile.type, upsert: true })
        if (!uploadError && uploadData) cover_url = getStorageUrl('covers', uploadData.path)
      }

      const { data, error } = await supabaseAdmin.from('posts')
        .insert({
          title, slug, content, excerpt, category, author, cover_url, published,
          published_at: published ? new Date().toISOString() : null
        })
        .select().single()

      if (error) {
        if (error.code === '23505') return NextResponse.json({ error: 'Já existe um post com este slug.' }, { status: 400 })
        throw error
      }
      return NextResponse.json({ post: data }, { status: 201 })
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  })
}

export async function PUT(request: NextRequest) {
  return withAdminAuth(request, async () => {
    try {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const title = formData.get('title') as string
      const slug = formData.get('slug') as string
      const content = formData.get('content') as string
      const excerpt = formData.get('excerpt') as string
      const category = formData.get('category') as string
      const author = formData.get('author') as string
      const published = formData.get('published') === 'true'
      const coverFile = formData.get('cover') as File | null

      if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

      let cover_url: string | undefined
      if (coverFile && coverFile.size > 0) {
        const ext = coverFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${ext}`
        const buffer = await coverFile.arrayBuffer()
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('covers').upload(fileName, buffer, { contentType: coverFile.type, upsert: true })
        if (!uploadError && uploadData) cover_url = getStorageUrl('covers', uploadData.path)
      }

      const { data, error } = await supabaseAdmin.from('posts')
        .update({
          title, slug, content, excerpt, category, author, published,
          updated_at: new Date().toISOString(),
          ...(published ? { published_at: new Date().toISOString() } : {}),
          ...(cover_url ? { cover_url } : {})
        })
        .eq('id', id).select().single()

      if (error) throw error
      return NextResponse.json({ post: data })
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  })
}

export async function DELETE(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })
    const { error } = await supabaseAdmin.from('posts').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  })
}