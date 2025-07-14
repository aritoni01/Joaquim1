import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  define: {
    // Expor dados das notícias como variável global
    __NOTICIAS_DATA__: JSON.stringify(loadNoticiasData())
  }
})

function loadNoticiasData() {
  try {
    const noticiasDir = resolve(__dirname, 'content/noticias')
    const files = readdirSync(noticiasDir).filter(file => file.endsWith('.md'))
    
    return files.map(file => {
      const content = readFileSync(resolve(noticiasDir, file), 'utf-8')
      const { frontmatter, content: markdownContent } = parseFrontmatter(content)
      
      return {
        id: file.replace('.md', ''),
        title: frontmatter.title || 'Sem título',
        date: frontmatter.date || new Date().toISOString(),
        summary: frontmatter.summary || '',
        category: frontmatter.category || 'noticias',
        published: frontmatter.published !== 'false',
        content: markdownContent
      }
    }).filter(noticia => noticia.published)
  } catch (error) {
    console.error('Erro ao carregar notícias:', error)
    return []
  }
}

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, content: content }
  }
  
  const frontmatterText = match[1]
  const markdownContent = match[2]
  
  const frontmatter = {}
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1)
      }
      
      frontmatter[key] = value
    }
  })
  
  return { frontmatter, content: markdownContent }
}
