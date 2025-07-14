import matter from 'gray-matter';

// Cache para melhorar performance
const contentCache = new Map();
const configCache = new Map();

/**
 * Carrega ficheiros de configuração YAML
 */
export async function loadConfig(configName) {
  if (configCache.has(configName)) {
    return configCache.get(configName);
  }

  try {
    const response = await fetch(`/content/config/${configName}.yml`);
    if (!response.ok) {
      throw new Error(`Não foi possível carregar ${configName}`);
    }
    
    const yamlContent = await response.text();
    const { data } = matter(yamlContent);
    
    configCache.set(configName, data);
    return data;
  } catch (error) {
    console.error(`Erro ao carregar configuração ${configName}:`, error);
    return null;
  }
}

/**
 * Carrega conteúdo markdown de uma pasta
 */
export async function loadContent(folder, options = {}) {
  const cacheKey = `${folder}-${JSON.stringify(options)}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    // Em ambiente de produção, você precisará de uma forma de listar os ficheiros
    // Por agora, vamos usar uma abordagem que tenta carregar ficheiros conhecidos
    const content = await loadContentFromManifest(folder, options);
    
    contentCache.set(cacheKey, content);
    return content;
  } catch (error) {
    console.error(`Erro ao carregar conteúdo de ${folder}:`, error);
    return [];
  }
}

/**
 * Carrega um ficheiro markdown específico
 */
export async function loadSingleContent(folder, filename) {
  try {
    const response = await fetch(`/content/${folder}/${filename}`);
    if (!response.ok) {
      throw new Error(`Ficheiro não encontrado: ${filename}`);
    }
    
    const markdownContent = await response.text();
    const { data, content } = matter(markdownContent);
    
    return {
      frontmatter: data,
      content,
      slug: filename.replace('.md', '')
    };
  } catch (error) {
    console.error(`Erro ao carregar ${filename}:`, error);
    return null;
  }
}

/**
 * Carrega conteúdo com base numa lista conhecida de ficheiros
 */
async function loadContentFromManifest(folder, options) {
  // Lista de ficheiros conhecidos - em produção seria dinâmica
  const knownFiles = {
    noticias: [
      'exemplo-noticia.md',
      '2025-07-14-gft.md',
      '2025-07-14-tdf.md',
      '2025-01-15-feira-medieval.md',
      '2025-01-15-obras-biblioteca.md',
      '2025-01-15-festival-douro.md'
    ],
    pages: [],
    artigos: []
  };

  const files = knownFiles[folder] || [];
  const contentItems = [];

  for (const file of files) {
    try {
      const response = await fetch(`/content/${folder}/${file}`);
      if (response.ok) {
        const markdownContent = await response.text();
        const { data, content } = matter(markdownContent);
        
        // Aplicar filtros se especificados
        if (options.published !== false && data.published === false) {
          continue;
        }
        
        if (options.category && data.category !== options.category) {
          continue;
        }

        if (options.isEvent !== undefined && data.isEvent !== options.isEvent) {
          continue;
        }

        contentItems.push({
          frontmatter: data,
          content,
          slug: file.replace('.md', ''),
          filename: file
        });
      }
    } catch (error) {
      console.warn(`Não foi possível carregar ${file}:`, error);
    }
  }

  // Ordenar por data (mais recente primeiro)
  contentItems.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || 0);
    const dateB = new Date(b.frontmatter.date || 0);
    return dateB - dateA;
  });

  // Aplicar limite se especificado
  if (options.limit) {
    return contentItems.slice(0, options.limit);
  }

  return contentItems;
}

/**
 * Pesquisa conteúdo por texto
 */
export async function searchContent(query, options = {}) {
  const allContent = await loadContent('noticias', { published: true });
  
  if (!query || query.trim() === '') {
    return allContent;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return allContent.filter(item => {
    const title = (item.frontmatter.title || '').toLowerCase();
    const summary = (item.frontmatter.summary || '').toLowerCase();
    const content = (item.content || '').toLowerCase();
    const tags = (item.frontmatter.tags || []).join(' ').toLowerCase();
    
    return title.includes(searchTerm) || 
           summary.includes(searchTerm) || 
           content.includes(searchTerm) ||
           tags.includes(searchTerm);
  });
}

/**
 * Filtra conteúdo por categoria
 */
export async function getContentByCategory(category) {
  return await loadContent('noticias', { 
    published: true, 
    category: category 
  });
}

/**
 * Obtém apenas eventos
 */
export async function getEvents() {
  return await loadContent('noticias', { 
    published: true, 
    isEvent: true 
  });
}

/**
 * Limpa a cache (útil para atualizações)
 */
export function clearCache() {
  contentCache.clear();
  configCache.clear();
}