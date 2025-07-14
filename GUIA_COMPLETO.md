# 🎯 Guia Completo - Sistema CMS Castelo de Paiva

## ✅ O que foi implementado

### 1. **CMS Funcional**
- ✅ Decap CMS (Netlify CMS) configurado
- ✅ Painel de administração em `/admin`
- ✅ Edição de notícias, páginas e configurações
- ✅ Upload de imagens
- ✅ Sistema de categorias

### 2. **Site Dinâmico**
- ✅ Interface moderna com React + TailwindCSS
- ✅ Carregamento automático de notícias/eventos
- ✅ Sistema de pesquisa e filtros
- ✅ Navegação por categorias e anos
- ✅ Design responsivo

### 3. **Importação de Eventos**
- ✅ Script para importar base de dados de eventos
- ✅ Suporte para CSV, Excel, JSON
- ✅ Conversão automática para formato Markdown
- ✅ Integração com o CMS

### 4. **Atualizações Automáticas**
- ✅ Commit automático no GitHub
- ✅ Deploy automático no Netlify
- ✅ Atualizações aparecem no site (1-2 minutos)

---

## 🚀 Como Usar o Sistema

### **A. Aceder ao Painel de Administração**
1. Vá para: `https://joaquimvieira.netlify.app/admin`
2. Faça login com credenciais do Netlify Identity
3. Comece a gerir conteúdos

### **B. Criar/Editar Notícias**
1. No painel, clique em "Notícias"
2. Clique em "New Notícias" ou edite uma existente
3. Preencha os campos:
   - **Título**: Nome da notícia/evento
   - **Data**: Data de publicação
   - **Imagem**: (opcional) Imagem destacada
   - **Resumo**: Breve descrição
   - **Categoria**: noticias, eventos, historia, turismo
   - **Conteúdo**: Texto completo em Markdown
   - **Publicado**: Marque para publicar
4. Clique em "Publish"

### **C. Importar Base de Dados de Eventos**

#### **Passo 1: Preparar os Dados**
Os eventos devem estar neste formato:
```javascript
const eventos = [
  {
    title: "Nome do Evento",
    date: "2025-08-15", // YYYY-MM-DD
    location: "Local do Evento",
    time: "19:00",
    organizer: "Organizador",
    contact: "contacto@email.com",
    description: "Descrição completa"
  }
];
```

#### **Passo 2: Executar Importação**
```bash
# Editar o script com seus dados
nano scripts/example-import.js

# Executar a importação
node scripts/example-import.js
```

#### **Passo 3: Verificar Resultado**
- Os eventos aparecem como ficheiros `.md` em `content/noticias/`
- Aparecem automaticamente no site após deploy

---

## 🔧 Configuração do Netlify

### **1. Netlify Identity**
1. No painel do Netlify, vá a **Settings > Identity**
2. Clique em **Enable Identity**
3. Configure as permissões de acesso

### **2. Git Gateway**
1. No painel do Netlify, vá a **Settings > Identity > Services**
2. Clique em **Enable Git Gateway**
3. Configure as permissões de commit

### **3. Deploy Automático**
1. No painel do Netlify, vá a **Settings > Build & deploy**
2. Em **Continuous Deployment**, ative **Deploys from GitHub**
3. Configure o branch principal (main)

---

## 📊 Fluxo de Trabalho

### **Editar Conteúdo**
1. **Aceder ao CMS**: `https://joaquimvieira.netlify.app/admin`
2. **Fazer alterações**: Criar/editar notícias
3. **Publicar**: Clicar em "Publish"
4. **Aguardar**: 1-2 minutos para aparecer no site

### **Importar Eventos**
1. **Preparar dados**: Formato JSON/CSV/Excel
2. **Executar script**: `node scripts/example-import.js`
3. **Fazer commit**: Os ficheiros são adicionados ao repositório
4. **Deploy automático**: Netlify faz deploy
5. **Verificar site**: Eventos aparecem automaticamente

---

## 🛠️ Desenvolvimento Local

### **Instalar e Executar**
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### **Estrutura do Projeto**
```
├── src/App.jsx              # Interface principal
├── content/noticias/         # Ficheiros Markdown
├── public/admin/             # Painel CMS
├── scripts/importEvents.js   # Script de importação
└── vite.config.js           # Configuração
```

---

## 🎨 Personalização

### **Adicionar Categorias**
Editar `src/App.jsx`:
```javascript
const categories = ['todas', 'noticias', 'eventos', 'historia', 'turismo', 'nova-categoria'];
```

### **Adicionar Campos ao CMS**
Editar `public/admin/config.yml`:
```yaml
- { label: "Novo Campo", name: "novo_campo", widget: "string" }
```

### **Alterar Cores/Estilo**
Editar `src/index.css` ou usar classes TailwindCSS

---

## 🔍 Resolução de Problemas

### **As alterações não aparecem no site**
1. **Verificar GitHub**: Há commits novos?
2. **Verificar Netlify**: Há deploys em andamento?
3. **Aguardar**: Deploy pode demorar 1-2 minutos
4. **Limpar cache**: Ctrl+F5

### **Não consigo aceder ao admin**
1. **Verificar Identity**: Está ativo no Netlify?
2. **Verificar permissões**: Tem acesso ao repositório?
3. **Verificar URL**: `https://joaquimvieira.netlify.app/admin`

### **Erro ao importar eventos**
1. **Verificar formato**: Dados no formato correto?
2. **Verificar permissões**: Pode escrever na pasta content?
3. **Verificar Node.js**: Está instalado?

---

## 📞 Suporte

### **Logs Úteis**
- **Netlify**: Settings > Build & deploy > Build logs
- **GitHub**: Commits e histórico
- **Browser**: F12 > Console

### **Documentação**
- [Decap CMS](https://decapcms.org/docs/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Vite](https://vitejs.dev/)

---

## ✅ Checklist Final

- [ ] Netlify Identity ativo
- [ ] Git Gateway configurado
- [ ] Deploy automático ativo
- [ ] CMS acessível em `/admin`
- [ ] Notícias aparecem no site
- [ ] Pesquisa e filtros funcionam
- [ ] Importação de eventos testada
- [ ] Design responsivo verificado

---

## 🎉 Sistema Pronto!

O sistema está completamente funcional e permite:

1. **Gerir conteúdos** sem editar código
2. **Importar eventos** da base de dados
3. **Navegar e pesquisar** facilmente
4. **Atualizações automáticas** no site

**Próximos passos:**
1. Configure o Netlify Identity
2. Teste o painel de administração
3. Importe a base de dados de eventos
4. Personalize conforme necessário