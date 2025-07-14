# Portal de Castelo de Paiva

Sistema completo de gestão de conteúdo para o site oficial do Município de Castelo de Paiva, construído com React e Decap CMS.

## 🌟 Características

- **Sistema de administração sem código** - Gerir todo o conteúdo através do painel web
- **Carregamento dinâmico** - Todas as alterações aparecem automaticamente na página principal
- **Sistema de busca e navegação** - Os utilizadores podem encontrar facilmente o conteúdo
- **Responsive design** - Funciona perfeitamente em todos os dispositivos
- **Categorização automática** - Eventos e notícias organizados por categoria
- **SEO otimizado** - Meta tags e estrutura optimizada para motores de busca

## 🚀 Configuração Inicial

### 1. Clonar e Instalar
```bash
git clone [seu-repositório]
cd castelo-paiva
npm install
```

### 2. Desenvolvimento Local
```bash
npm run dev
```

### 3. Deploy (Netlify)
1. Conectar o repositório ao Netlify
2. Configurar as variáveis de ambiente:
   - `NODE_VERSION=18`
3. Ativar o Git Gateway no painel do Netlify
4. Deploy automático estará configurado

## 📝 Como Usar o Sistema de Administração

### Acesso
1. Aceder a `[seu-site.com]/admin`
2. Fazer login com as credenciais do Git Gateway
3. Começar a gerir conteúdo!

### Gestão de Conteúdo

#### Notícias e Eventos
- **Criar**: Clicar em "Notícias e Eventos" → "Nova entrada"
- **Categorias disponíveis**: noticia, evento, comunicado, obra, cultura, desporto, turismo, educacao
- **Eventos**: Marcar "Evento?" e preencher dados específicos (data, local, preço)
- **Publicação**: Usar o botão "Publicado" para controlar visibilidade

#### Configuração do Site
- **Informações gerais**: Nome, descrição, contactos, redes sociais
- **Navegação**: Editar menu principal e submenus
- **Homepage**: Personalizar título, subtítulo, imagem e secções destacadas

#### Páginas Estáticas
- Criar páginas personalizadas com conteúdo markdown
- Ideal para páginas institucionais permanentes

## 🎯 Funcionalidades para Utilizadores

### Página Principal
- Notícias recentes em destaque
- Próximos eventos
- Secções navegáveis configuráveis
- Informações de contacto

### Sistema de Busca
- Pesquisa por texto em títulos, resumos e conteúdo
- Filtros por categoria
- Filtros por tipo (notícias vs eventos)
- Resultados em tempo real

### Navegação
- Menu responsivo configurável através do admin
- Categorização automática
- URLs amigáveis para SEO

## 🛠️ Estrutura Técnica

### Tecnologias
- **React 18** - Interface de utilizador
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Styling
- **React Router** - Navegação
- **Decap CMS** - Sistema de administração
- **Gray Matter** - Parser de frontmatter
- **Markdown to JSX** - Renderização de markdown

### Arquitetura de Ficheiros
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navigation.jsx   # Menu de navegação dinâmico
│   ├── NewsCard.jsx     # Card para notícias/eventos
│   ├── SearchBar.jsx    # Barra de pesquisa
│   └── FilterBar.jsx    # Filtros de categoria
├── pages/               # Páginas principais
│   ├── Homepage.jsx     # Página inicial
│   ├── NewsPage.jsx     # Lista de notícias
│   └── NewsDetail.jsx   # Detalhes de notícia/evento
├── utils/               # Utilitários
│   └── contentLoader.js # Carregamento dinâmico de conteúdo
└── App.jsx             # Aplicação principal

content/
├── config/             # Configurações do site
│   ├── site.yml        # Informações gerais
│   ├── navigation.yml  # Estrutura do menu
│   └── homepage.yml    # Configuração da homepage
├── noticias/           # Notícias e eventos
└── pages/              # Páginas estáticas

public/
├── admin/              # Painel de administração
│   ├── index.html      # Interface do Decap CMS
│   └── config.yml      # Configuração do CMS
└── images/             # Imagens carregadas
```

## 🔧 Personalização

### Adicionar Nova Categoria
1. Editar `public/admin/config.yml` - adicionar à lista de opções
2. Editar `src/components/NewsCard.jsx` - adicionar cor na função `CategoryBadge`
3. Editar `src/components/FilterBar.jsx` - adicionar à lista de categorias

### Modificar Layout da Homepage
1. Ir ao painel admin → "Página Principal" → "Configuração da Homepage"
2. Personalizar secções em destaque, imagens, títulos
3. Alterações aparecem automaticamente

### Adicionar Nova Página
1. Painel admin → "Páginas" → "Nova entrada"
2. A página estará acessível via URL baseada no nome do ficheiro
3. Para adicionar ao menu: "Configuração do Site" → "Navegação"

## 📊 Base de Dados de Eventos

O sistema está preparado para gerir uma base completa de eventos de Castelo de Paiva:

- **Eventos municipais**: Feiras, festivais, comemorações
- **Eventos culturais**: Exposições, espetáculos, workshops
- **Eventos desportivos**: Competições, torneios, atividades
- **Eventos turísticos**: Rotas, passeios, experiências

### Campos Específicos para Eventos
- Data e hora do evento
- Local específico
- Preço de entrada
- Categoria temática
- Tags para facilitar busca

## 🔒 Segurança

- Git Gateway para autenticação segura
- Headers de segurança configurados
- Validação de conteúdo no frontend
- Proteção contra XSS e outros ataques

## 🚀 Performance

- Sistema de cache para conteúdo carregado
- Carregamento lazy de imagens
- Bundle optimizado com Vite
- Compressão automática no deploy

## 📱 Responsividade

- Design mobile-first
- Navegação touch-friendly
- Imagens otimizadas para diferentes dispositivos
- Performance mantida em todas as resoluções

## 🔄 Atualizações

Para adicionar novo conteúdo:
1. Aceder ao painel de administração
2. Criar/editar conteúdo
3. Publicar
4. **As mudanças aparecem automaticamente no site!**

Não é necessário tocar no código para:
- ✅ Adicionar notícias/eventos
- ✅ Alterar informações de contacto
- ✅ Modificar navegação
- ✅ Personalizar homepage
- ✅ Gerir categorias e tags
- ✅ Upload de imagens

## 🆘 Suporte

Para suporte técnico ou dúvidas sobre o sistema, contactar o administrador técnico através dos canais oficiais do município.

---

**Desenvolvido especificamente para o Município de Castelo de Paiva**  
Sistema de gestão de conteúdo moderno, intuitivo e poderoso.