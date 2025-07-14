const { importEventsFromDatabase } = require('./importEvents');

// Exemplo de dados de eventos de Castelo de Paiva
// Substitua estes dados pelos seus dados reais
const eventosCasteloPaiva = [
  {
    title: "Festival de Gastronomia Local",
    date: "2025-08-15",
    location: "Praça Central de Castelo de Paiva",
    time: "19:00",
    organizer: "Câmara Municipal de Castelo de Paiva",
    contact: "info@castelodepaiva.pt",
    description: "Festival anual de gastronomia local com os melhores restaurantes da região. Degustação de pratos tradicionais e vinhos locais."
  },
  {
    title: "Feira Medieval",
    date: "2025-09-20",
    location: "Castelo de Paiva",
    time: "10:00 - 18:00",
    organizer: "Associação Cultural de Castelo de Paiva",
    contact: "cultural@castelodepaiva.pt",
    description: "Recriação histórica medieval com artesanato, música e gastronomia da época. Atividades para toda a família."
  },
  {
    title: "Concurso de Vinhos",
    date: "2025-10-05",
    location: "Auditório Municipal",
    time: "20:00",
    organizer: "Associação de Viticultores",
    contact: "vinhos@castelodepaiva.pt",
    description: "Concurso anual de vinhos da região com degustação e prémios para os melhores produtores."
  },
  {
    title: "Festival de Música Tradicional",
    date: "2025-07-25",
    location: "Jardim Municipal",
    time: "21:00",
    organizer: "Grupo Folclórico de Castelo de Paiva",
    contact: "musica@castelodepaiva.pt",
    description: "Festival de música tradicional portuguesa com grupos locais e convidados especiais."
  },
  {
    title: "Exposição de Artesanato",
    date: "2025-11-10",
    location: "Centro Cultural",
    time: "09:00 - 18:00",
    organizer: "Associação de Artesãos",
    contact: "artesanato@castelodepaiva.pt",
    description: "Exposição de artesanato local com demonstrações ao vivo e venda de produtos artesanais."
  }
];

// Função para importar dados de CSV
function importFromCSV(csvData) {
  // Converter CSV para array de objetos
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const eventos = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const evento = {};
    
    headers.forEach((header, index) => {
      evento[header] = values[index] || '';
    });
    
    return evento;
  });
  
  return eventos;
}

// Função para importar dados de Excel (JSON exportado)
function importFromExcelJSON(excelData) {
  // Excel exportado como JSON
  return excelData.map(row => ({
    title: row['Título'] || row['Title'],
    date: row['Data'] || row['Date'],
    location: row['Local'] || row['Location'],
    time: row['Hora'] || row['Time'],
    organizer: row['Organizador'] || row['Organizer'],
    contact: row['Contacto'] || row['Contact'],
    description: row['Descrição'] || row['Description']
  }));
}

// Exemplo de uso com dados CSV
const csvExample = `Título,Data,Local,Hora,Organizador,Contacto,Descrição
Festival Gastronómico,2025-08-15,Praça Central,19:00,Câmara Municipal,info@castelodepaiva.pt,Festival de gastronomia local
Feira Medieval,2025-09-20,Castelo,10:00-18:00,Associação Cultural,cultural@castelodepaiva.pt,Recriação medieval`;

// Exemplo de uso com dados Excel (JSON)
const excelExample = [
  {
    "Título": "Festival Gastronómico",
    "Data": "2025-08-15",
    "Local": "Praça Central",
    "Hora": "19:00",
    "Organizador": "Câmara Municipal",
    "Contacto": "info@castelodepaiva.pt",
    "Descrição": "Festival de gastronomia local"
  }
];

console.log('🚀 Iniciando importação de eventos...\n');

// Importar eventos de exemplo
importEventsFromDatabase(eventosCasteloPaiva);

console.log('\n📋 Para importar seus dados reais:');
console.log('1. Prepare os dados no formato correto');
console.log('2. Use uma das funções de conversão (CSV, Excel, etc.)');
console.log('3. Chame importEventsFromDatabase(seusDados)');
console.log('4. Os eventos aparecerão automaticamente no site após deploy');

// Exemplo de como usar com dados CSV
// const eventosCSV = importFromCSV(csvExample);
// importEventsFromDatabase(eventosCSV);

// Exemplo de como usar com dados Excel
// const eventosExcel = importFromExcelJSON(excelExample);
// importEventsFromDatabase(eventosExcel);