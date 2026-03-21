# Instituto Voz da Alma — Versão Supabase 🟢

Site institucional com **Next.js 15** + **Supabase** (banco de dados + storage de fotos).  
Deploy: **Vercel** (gratuito).  
Custo mensal total: **R$ 0,00** até crescer bastante.

---

## Por que esta versão é mais simples?

```
Antes (WordPress):                Agora (Supabase):
━━━━━━━━━━━━━━━━━━━━━            ━━━━━━━━━━━━━━━━━━━━━
Vercel (Next.js)      →          Vercel (Next.js)
+ Hostinger (R$12/mês)           + Supabase (gratuito)
+ WordPress instalado            Painel admin = dentro do próprio site
+ Plugin WPGraphQL               Sem servidor PHP
+ Subdomínio configurado         Sem subdomínio
= muito setup                    = tudo em 2 serviços simples
```

---

## 🚀 Setup em 4 passos

### PASSO 1 — Criar conta no Supabase (5 minutos)

1. Acesse **supabase.com** e crie uma conta gratuita
2. Clique em **"New Project"**
3. Preencha:
   - Organization: seu nome ou nome do cliente
   - Project name: `instituto-voz-da-alma`
   - Database Password: crie uma senha forte e **anote ela**
   - Region: **South America (São Paulo)**
4. Aguarde ~2 minutos para o projeto ser criado

### PASSO 2 — Criar o banco de dados (3 minutos)

1. No painel do Supabase, clique em **"SQL Editor"** no menu esquerdo
2. Clique em **"New query"**
3. Abra o arquivo `supabase/schema.sql` deste projeto
4. Copie todo o conteúdo e cole no SQL Editor
5. Clique em **"Run"** (botão verde)
6. Deve aparecer "Success" ✅

### PASSO 3 — Pegar as chaves de API (2 minutos)

1. No Supabase, vá em **Settings → API** (menu esquerdo)
2. Você verá três valores importantes:

```
Project URL:     https://XXXXXXXXXXX.supabase.co
anon public:     eyJhbGci...  (chave longa)
service_role:    eyJhbGci...  (chave longa — nunca exponha esta!)
```

3. Copie esses três valores

### PASSO 4 — Configurar o projeto local

1. Na pasta do projeto, crie o arquivo `.env.local`:
```bash
cp .env.example .env.local
```

2. Abra `.env.local` e preencha com seus dados:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...sua-service-role-key

ADMIN_PASSWORD=escolha-uma-senha-para-o-painel
JWT_SECRET=qualquer-texto-longo-de-pelo-menos-32-caracteres-aqui

NEXT_PUBLIC_SITE_URL=https://www.institutovozdaalma.com.br
```

3. Instale as dependências e rode:
```bash
npm install
npm run dev
```

4. Acesse **localhost:3000** — site funcionando! ✅
5. Acesse **localhost:3000/admin/login** — painel admin! ✅

---

## 🌐 Deploy na Vercel (10 minutos)

### 1. Criar conta na Vercel
Acesse **vercel.com** e crie conta gratuita (pode entrar com GitHub, Google ou e-mail)

### 2. Instalar a CLI
```bash
npm install -g vercel
```

### 3. Fazer o deploy
No terminal, dentro da pasta do projeto:
```bash
vercel login
vercel
```

Responda as perguntas:
```
Set up and deploy? → Y (Enter)
Which scope? → seu usuário (Enter)
Link to existing project? → N (Enter)
Project name? → instituto-voz-da-alma (Enter)
Directory? → . (ponto, Enter)
```

A Vercel vai gerar uma URL temporária como:  
`instituto-voz-da-alma.vercel.app`

### 4. Adicionar variáveis de ambiente na Vercel

1. Acesse **vercel.com** no navegador
2. Clique no seu projeto
3. Vá em **Settings → Environment Variables**
4. Adicione cada variável do seu `.env.local` uma por uma:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | sua URL do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sua anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | sua service role key |
| `ADMIN_PASSWORD` | sua senha do painel |
| `JWT_SECRET` | seu texto secreto |
| `NEXT_PUBLIC_SITE_URL` | https://www.seudominio.com.br |

### 5. Fazer o deploy final
```bash
vercel --prod
```

Site no ar! 🎉

---

## 🌍 Apontar o domínio do cliente

### No painel da Vercel:
1. Seu projeto → **Settings → Domains**
2. Clique em **"Add Domain"**
3. Digite: `www.institutovozdaalma.com.br`
4. A Vercel vai mostrar os registros DNS necessários

### No Registro.br:
1. Acesse **registro.br** e faça login com os dados do cliente
2. Clique no domínio → **Editar Zona DNS**
3. Adicione os registros que a Vercel indicou:

```
Tipo A    →  @    →  76.76.21.21
Tipo CNAME →  www  →  cname.vercel-dns.com
```

4. Aguarde até 1h para propagar (geralmente menos de 15 min)
5. A Vercel instala o SSL (HTTPS) automaticamente ✅

---

## ✍️ Como usar o painel admin

Acesse: `www.seudominio.com.br/admin/login`

### Publicar um artigo:
1. Login com a senha que você configurou em `ADMIN_PASSWORD`
2. Dashboard → **"Novo artigo"**
3. Preencha: título, texto, categoria, imagem de capa
4. Clique **"Publicar"** — aparece no site imediatamente! ✅

### Adicionar fotos à galeria:
1. Dashboard → **"Adicionar fotos"**
2. Clique na área de upload ou arraste as fotos
3. Pode enviar várias fotos de uma vez
4. Clique **"Enviar"** — aparecem na galeria imediatamente! ✅

---

## 📊 Limites do plano gratuito do Supabase

| Recurso | Limite gratuito | Suficiente para? |
|---------|----------------|------------------|
| Banco de dados | 500 MB | ~50.000 artigos |
| Storage (fotos) | 1 GB | ~2.000 fotos em boa qualidade |
| Transferência | 5 GB/mês | ~50.000 visitas/mês |
| Requisições API | 500K/mês | Muito mais que suficiente |

Quando precisar de mais, o plano Pro custa **USD $25/mês** (~R$130/mês).

---

## 🔍 SEO — O que está configurado

✅ Meta titles e descriptions dinâmicos por página  
✅ Open Graph (compartilhamento em redes sociais)  
✅ Schema.org (Organization, Article, FAQ, Breadcrumb)  
✅ Sitemap.xml dinâmico — atualiza automaticamente ao publicar posts  
✅ robots.txt  
✅ URLs amigáveis (/blog/nome-do-artigo)  
✅ HTTPS automático pela Vercel  
✅ Headers de segurança HTTP  

### Para maximizar o SEO após o deploy:
1. Acesse **search.google.com/search-console** e cadastre o site
2. Envie o sitemap: `www.seudominio.com.br/sitemap.xml`
3. Publique artigos regularmente (mínimo 2x por semana)
4. Preencha todos os campos ao publicar (título, resumo, imagem)

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── blog/                 # Lista + posts individuais
│   ├── galeria/              # Galeria de fotos
│   ├── contato/              # Formulário de contato
│   ├── privacidade/          # Política de Privacidade (LGPD)
│   ├── admin/
│   │   ├── login/            # Tela de login
│   │   ├── dashboard/        # Painel principal
│   │   ├── posts/novo/       # Editor de artigos
│   │   └── galeria/          # Upload de fotos
│   └── api/
│       ├── auth/             # Login/logout
│       ├── posts/            # CRUD de posts
│       ├── gallery/          # Upload e gestão de fotos
│       └── contact/          # Formulário de contato
├── lib/
│   ├── supabase.ts           # ← Toda integração com Supabase
│   ├── auth.ts               # JWT para o painel admin
│   ├── seo.ts                # Schema.org e metadados
│   └── utils.ts              # Funções auxiliares
└── supabase/
    └── schema.sql            # ← Execute este SQL no Supabase
```

---

## Comparação com a versão WordPress

| | Versão WordPress | Versão Supabase (esta) |
|---|---|---|
| Custo mensal | ~R$12/mês (Hostinger) | R$0 |
| Setup inicial | Complexo | Simples |
| Painel de conteúdo | WordPress (completo) | Admin próprio no site |
| Editor de texto | Gutenberg (rico) | Texto com HTML básico |
| Plugins/extensões | Milhares disponíveis | Não se aplica |
| Performance | Boa | Excelente |
| Escalabilidade | Limitada ao plano | Alta |

