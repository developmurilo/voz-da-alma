# Instituto Voz da Alma 

Um site institucional completo e moderno desenvolvido para uma clínica interdisciplinar especializada no desenvolvimento infantil, autismo (TEA) e neurodivergências.

O projeto conta com um front-end de alta performance, design responsivo com foco em UX/UI lúdico e profissional, e um **Painel Administrativo exclusivo** criado do zero para o cliente gerenciar as postagens do blog e as imagens da galeria de forma autônoma.

##  Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** (App Router) - Framework React principal do projeto, usado para as rotas da interface UI e as rotas de API serverless.
- **[React 18](https://react.dev/)** - Biblioteca JavaScript base.
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização responsiva, construção da identidade visual (Design System) com variáveis exclusivas e layouts fluidos.
- **[Supabase](https://supabase.com/)** - Backend as a Service (BaaS) operando de forma serverless. Empregado para o Banco de Dados (PostgreSQL) e o Storage (Upload/Get de mídias).
- **[Resend](https://resend.com/)** - Integração robusta via API para o envio automatizado de formulários e e-mails de contato.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem forte para garantir integridade na arquitetura e nas requisições do BD.

##  Principais Funcionalidades e Diferenciais

- **Design Premium e Acessível:** Interface desenhada para ser rápida e acessível. Uso de elementos orgânicos, scroll suave, glassmorphism moderado e responsividade rigorosa do Mobile ao Widescreen.
- **Painel Administrativo Full-Stack (`/admin`):**
  - Autenticação e Sistema de Sessão com Tokens JWT para proteção das rotas privadas.
  - Editor WYSIWYG de texto rico (TipTap) para fácil formatação, publicação e exclusão de artigos no Blog.
  - Upload múltiplo e gestão visual de imagens para o componente de Galeria.
- **Formulário Dinâmico:** Envio contínuo de contatos pela página do usuário, com tratamento de erros, validações e alertas, integrado diretamente ao fluxo de e-mails via Resend.
- **Otimização Extrema de SEO Técnico (Search Engine Optimization):**
  - Geração nativa e dinâmica de Metadados e imagens do Open Graph.
  - Sitemaps (`sitemap.xml`) e `robots.txt` criados de forma dinâmica para indexar novos artigos automaticamente no Google.
  - Injeção de marcações Schema.org e Dados Estruturados (Local Business, Articles e FAQ pages) maximizando as chances de exibir _Rich Snippets_.
- **Performance e Web Vitals:** Carregamento otimizado com o componente `next/image` e tipografia nativa (`next/font`) que minimizam requisições bloqueantes.

##  Como executar o projeto localmente

1. Clone este repositório:
```bash
git clone https://github.com/SeuUsuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente renomeando o arquivo base ou criando um arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

ADMIN_PASSWORD=senha_desejada_para_o_painel
JWT_SECRET=sua_chave_secreta_jwt

NEXT_PUBLIC_SITE_URL=http://localhost:3000

RESEND_API_KEY=sua_chave_da_api_do_resend
EMAIL_TO=email_que_recebera_mensagens@gmail.com
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. O site principal estará disponível em `http://localhost:3000` e a interface de administrador em `http://localhost:3000/admin/login`.

##  Arquitetura Central

```text
src/
├── app/                  # Ecossistema do Next.js (Pages, Layouts, Loading states)
│   ├── admin/            # Subsistema administrativo, páginas de dashboard e criação de posts
│   ├── api/              # Tráfego backend e endpoints Serverless (auth, posts, resend)
│   └── (frontend)        # Telas institucionais: blog, faq, contato, sobre, galeria
├── components/           # Camada de componentes burros (Dumb Components) e Layout (Header/Footer)
├── lib/                  # Helpers lógicos vitais da aplicação
│   ├── supabase.ts       # Setup e integração da SDK
│   ├── seo.ts            # Gerador parametrizado de meta tags e construtor Schema.org
│   └── auth.ts           # Validação e encriptação (Jose/JWT)
└── styles/               # Ponto de entrada do Tailwind, variáveis raiz e tipografia
```

---
*Este projeto demonstra a habilidade arquitetural de conceber um ecossistema CMS full-stack com ferramentas modernas, descartando uso de sistemas blocados e pesados (como WordPress padrão), e integrando todo o fluxo de operação diretamente em uma única codebase otimizada.*
