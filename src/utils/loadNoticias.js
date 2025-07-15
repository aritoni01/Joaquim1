// Função para carregar notícias dos ficheiros Markdown
export const loadNoticiasFromFiles = async () => {
  try {
    if (typeof __NOTICIAS_DATA__ !== 'undefined') {
      return __NOTICIAS_DATA__.map(addSlug);
    }

    return getMockNoticias();
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
    return getMockNoticias();
  }
};

// Função para adicionar slug ao objeto
const addSlug = (noticia) => ({
  ...noticia,
  slug: generateSlug(noticia.title)
});

// Gerador simples de slug
const generateSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remover acentos
    .replace(/[^a-z0-9]+/g, '-') // trocar não letras por hífen
    .replace(/(^-|-$)/g, '');    // tirar hífens no início/fim

// Dados mock com slugs manuais
const getMockNoticias = () => {
  return [
    {
      id: 'exemplo-noticia',
      title: "Bem-vindos ao Castelo de Paiva",
      slug: "bem-vindos-ao-castelo-de-paiva",
      date: "2025-01-15T10:00:00.000Z",
      summary: "Esta é uma notícia de exemplo para testar o sistema de gestão de conteúdos.",
      category: "noticias",
      published: true,
      content: "Esta é uma notícia de exemplo criada para testar o funcionamento do Decap CMS..."
    },
    {
      id: '2025-07-14-gft',
      title: "Grande Festival de Teatro",
      slug: "grande-festival-de-teatro",
      date: "2025-07-14T10:00:00.000Z",
      summary: "Festival de teatro com artistas locais e nacionais.",
      category: "eventos",
      published: true,
      content: "O Grande Festival de Teatro promete trazer as melhores peças..."
    },
    {
      id: '2025-07-14-tdf',
      title: "Tradições e Danças Folclóricas",
      slug: "tradicoes-e-dancas-folcloricas",
      date: "2025-07-14T18:00:00.000Z",
      summary: "Celebração das tradições locais com danças e música tradicional.",
      category: "eventos",
      published: true,
      content: "Uma noite especial dedicada às tradições e danças folclóricas..."
    }
  ];
};

// Função para processar frontmatter do Markdown
export const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
};
