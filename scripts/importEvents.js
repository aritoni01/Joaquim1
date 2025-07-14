const fs = require('fs');
const path = require('path');

// Função para importar eventos de uma base de dados
function importEventsFromDatabase(eventsData) {
  const noticiasDir = path.join(__dirname, '../content/noticias');
  
  // Garantir que o diretório existe
  if (!fs.existsSync(noticiasDir)) {
    fs.mkdirSync(noticiasDir, { recursive: true });
  }
  
  eventsData.forEach((event, index) => {
    const fileName = generateFileName(event);
    const markdownContent = convertEventToMarkdown(event);
    
    const filePath = path.join(noticiasDir, fileName);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    
    console.log(`✅ Evento importado: ${fileName}`);
  });
  
  console.log(`\n🎉 Importação concluída! ${eventsData.length} eventos foram convertidos para notícias.`);
}

// Gerar nome do ficheiro baseado na data e título
function generateFileName(event) {
  const date = new Date(event.date || event.data || new Date());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Criar slug do título
  const slug = event.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  
  return `${year}-${month}-${day}-${slug}.md`;
}

// Converter evento para formato Markdown
function convertEventToMarkdown(event) {
  const date = new Date(event.date || event.data || new Date());
  
  const frontmatter = {
    title: event.title || event.titulo || 'Evento sem título',
    date: date.toISOString(),
    summary: event.summary || event.resumo || event.description || event.descricao || 'Descrição do evento',
    category: 'eventos',
    published: true,
    image: event.image || event.imagem || '',
    location: event.location || event.local || event.localizacao || '',
    time: event.time || event.hora || '',
    organizer: event.organizer || event.organizador || '',
    contact: event.contact || event.contato || ''
  };
  
  // Gerar frontmatter
  const frontmatterText = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: "${value}"`)
    .join('\n');
  
  // Gerar conteúdo Markdown
  let content = `# ${frontmatter.title}\n\n`;
  
  if (frontmatter.location) {
    content += `**Local:** ${frontmatter.location}\n\n`;
  }
  
  if (frontmatter.time) {
    content += `**Hora:** ${frontmatter.time}\n\n`;
  }
  
  if (frontmatter.organizer) {
    content += `**Organizador:** ${frontmatter.organizer}\n\n`;
  }
  
  if (frontmatter.contact) {
    content += `**Contacto:** ${frontmatter.contact}\n\n`;
  }
  
  content += `${frontmatter.summary}\n\n`;
  
  if (event.description || event.descricao) {
    content += `${event.description || event.descricao}\n\n`;
  }
  
  return `---\n${frontmatterText}\n---\n\n${content}`;
}

// Exemplo de uso com dados mock
function exampleUsage() {
  const sampleEvents = [
    {
      title: "Festival de Gastronomia Local",
      date: "2025-08-15",
      location: "Praça Central de Castelo de Paiva",
      time: "19:00",
      organizer: "Câmara Municipal",
      contact: "info@castelodepaiva.pt",
      description: "Festival anual de gastronomia local com os melhores restaurantes da região."
    },
    {
      title: "Feira Medieval",
      date: "2025-09-20",
      location: "Castelo de Paiva",
      time: "10:00 - 18:00",
      organizer: "Associação Cultural",
      contact: "cultural@castelodepaiva.pt",
      description: "Recriação histórica medieval com artesanato, música e gastronomia da época."
    }
  ];
  
  importEventsFromDatabase(sampleEvents);
}

// Se executado diretamente, mostrar exemplo
if (require.main === module) {
  console.log('📝 Script de importação de eventos para notícias\n');
  console.log('Para usar este script:');
  console.log('1. Prepare os dados dos eventos no formato correto');
  console.log('2. Chame importEventsFromDatabase(seusDados)');
  console.log('3. Os eventos serão convertidos para ficheiros Markdown\n');
  
  console.log('Exemplo de uso:');
  exampleUsage();
}

module.exports = {
  importEventsFromDatabase,
  convertEventToMarkdown,
  generateFileName
};