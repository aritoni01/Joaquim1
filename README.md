# Castelo de Paiva - Site Oficial

Site oficial do município de Castelo de Paiva com sistema de gestão de conteúdos (CMS) integrado.

## 🚀 Funcionalidades

- **CMS Integrado**: Gerir conteúdos sem editar código
- **Notícias e Eventos**: Sistema completo de publicação
- **Navegação e Pesquisa**: Filtros por categoria, ano e pesquisa textual
- **Design Responsivo**: Interface moderna e adaptável
- **Atualizações Automáticas**: Alterações no CMS aparecem automaticamente no site

## 📝 Como Usar o CMS

### Aceder ao Painel de Administração
1. Vá para: `https://joaquimvieira.netlify.app/admin`
2. Faça login com as suas credenciais do Netlify Identity
3. Comece a criar e editar conteúdos

### Criar uma Nova Notícia/Evento
1. No painel admin, clique em "Notícias"
2. Clique em "New Notícias"
3. Preencha os campos:
   - **Título**: Nome da notícia/evento
   - **Data de Publicação**: Data do evento
   - **Imagem Destacada**: (opcional) Imagem do evento
   - **Resumo**: Breve descrição
   - **Categoria**: noticias, eventos, historia, turismo
   - **Conteúdo**: Texto completo em Markdown
   - **Publicado**: Marque para publicar

### Editar Conteúdo Existente
1. No painel admin, clique em "Notícias"
2. Clique na notícia que quer editar
3. Faça as alterações
4. Clique em "Publish" para publicar

## 🔄 Como as Alterações Aparecem no Site

### Processo Automático
1. **Edita no CMS** → Faz alterações no painel admin
2. **Commit Automático** → O CMS faz commit no GitHub
3. **Deploy Automático** → Netlify deteta o commit e faz novo deploy
4. **Site Atualizado** → As alterações aparecem no site (1-2 minutos)

### Se as Alterações Não Aparecerem
1. **Verifique o GitHub**: Vá ao repositório e veja se há commits novos
2. **Verifique o Netlify**: No painel do Netlify, veja se há deploys em andamento
3. **Aguarde**: O deploy pode demorar 1-2 minutos
4. **Limpe o Cache**: Ctrl+F5 para forçar atualização

## 📊 Importar Base de Dados de Eventos

### Preparar os Dados
Os eventos devem estar num formato que o script possa processar:

```javascript
const eventos = [
  {
    title: "Nome do Evento",
    date: "2025-08-15", // Data no formato YYYY-MM-DD
    location: "Local do Evento",
    time: "19:00",
    organizer: "Organizador",
    contact: "contacto@email.com",
    description: "Descrição completa do evento"
  }
  // ... mais eventos
];
```

### Executar a Importação
1. Prepare os dados no formato correto
2. Execute o script de importação:
   ```bash
   node scripts/importEvents.js
   ```
3. Os eventos serão convertidos para ficheiros Markdown
4. Aparecerão automaticamente no site após o próximo deploy

### Formatos Suportados
- **CSV**: Converta para JSON antes de usar
- **Excel**: Exporte para JSON ou CSV
- **JSON**: Use diretamente
- **Base de Dados**: Exporte para JSON

## 🛠️ Desenvolvimento Local

### Instalar Dependências
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Ponto de entrada
│   └── utils/
│       └── loadNoticias.js  # Carregamento de dados
├── content/
│   ├── noticias/            # Ficheiros Markdown das notícias
│   ├── pages/               # Páginas do site
│   └── config/              # Configurações do site
├── public/
│   ├── admin/               # Painel de administração
│   └── images/              # Imagens do site
├── scripts/
│   └── importEvents.js      # Script de importação
└── vite.config.js           # Configuração do Vite
```

## 🎨 Personalização

### Cores e Estilo
- Edite `src/index.css` para alterar cores e estilos
- Use Tailwind CSS para modificações rápidas

### Categorias de Conteúdo
- Edite `src/App.jsx` para adicionar/remover categorias
- Categorias atuais: noticias, eventos, historia, turismo

### Campos Adicionais
- Edite `public/admin/config.yml` para adicionar campos ao CMS
- Edite `scripts/importEvents.js` para mapear novos campos

## 🔧 Configuração do Netlify

### Netlify Identity
1. No painel do Netlify, vá a Settings > Identity
2. Ative o Identity
3. Configure as permissões de acesso

### Git Gateway
1. No painel do Netlify, vá a Settings > Identity > Services
2. Ative o Git Gateway
3. Configure as permissões de commit

### Deploy Automático
1. No painel do Netlify, vá a Settings > Build & deploy
2. Ative "Deploys from GitHub"
3. Configure o branch principal (main)

## 📞 Suporte

Para questões técnicas ou problemas:
- Verifique os logs do Netlify
- Consulte a documentação do Decap CMS
- Entre em contacto com a equipa de desenvolvimento

## 📄 Licença

Este projeto é propriedade do município de Castelo de Paiva.