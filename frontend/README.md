# 🖥️ Gabriela - Frontend (Painel Administrativo)

## 📋 Sobre

Frontend do painel administrativo completo da plataforma Gabriela, desenvolvido com HTML5, CSS3 e JavaScript Vanilla para máxima performance.

## ✨ Funcionalidades

### ✅ Sistema de Autenticação
- Login seguro com JWT
- Proteção de rotas
- Logout com confirmação

### 📊 Dashboard Principal
- Estatísticas em tempo real
- Agendamentos do dia
- Clientes novos
- Faturamento mensal
- Taxa de faltas

### 📅 Módulo Agenda
- Calendário completo
- Criação de agendamentos
- Status dos atendimentos
- Relatórios de faltas

### 👥 Módulo Clientes (CRM)
- Cadastro completo de clientes
- Fotos antes/depois
- Histórico de atendimentos
- Tags personalizadas
- Ticket médio

### 💵 Módulo Financeiro
- Registro de pagamentos
- Relatórios por período
- Análise por serviço
- Dashboard financeiro

### 📢 Módulo Marketing
- Captura de leads
- Segmentação de clientes
- Mensagens automatizadas
- Campanhas de reativação

### 📄 Módulo Documentos
- Termos de consentimento
- Ficha de anamnese
- Orientações pós-procedimento
- Histórico completo

## 🚀 Como Usar

### Desenvolvimento Local

1. **Clone o repositório**
```bash
git clone https://github.com/avilaops/gabriela.git
cd gabriela/frontend
```

2. **Abra com um servidor HTTP**

Opção 1 - Python:
```bash
python -m http.server 8000
```

Opção 2 - Node.js (http-server):
```bash
npx http-server -p 8000
```

Opção 3 - VS Code Live Server:
- Instale a extensão "Live Server"
- Clique com botão direito em `login.html`
- Selecione "Open with Live Server"

3. **Acesse no navegador**
```
http://localhost:8000/login.html
```

### Credenciais Padrão (Desenvolvimento)
```
Email: admin@gabriela.com
Senha: admin123
```

## 📁 Estrutura

```
frontend/
├── login.html              # Página de login
├── dashboard.html          # Dashboard principal
├── agenda.html             # Módulo de agenda (em desenvolvimento)
├── clientes.html           # Módulo de clientes (em desenvolvimento)
├── financeiro.html         # Módulo financeiro (em desenvolvimento)
├── marketing.html          # Módulo de marketing (em desenvolvimento)
├── documentos.html         # Módulo de documentos (em desenvolvimento)
└── assets/
    ├── css/
    │   └── style.css       # Estilos principais
    └── js/
        ├── api.js          # Comunicação com backend
        ├── auth.js         # Autenticação
        └── dashboard.js    # Lógica do dashboard
```

## 🔧 Configuração

### Backend API

O frontend está configurado para se conectar automaticamente ao backend:

- **Desenvolvimento local:** `http://localhost:3001/api`
- **Produção:** `https://gabriela-api.azurecontainerapps.io/api`

Para alterar, edite o arquivo `assets/js/api.js`:

```javascript
const API_BASE_URL = 'SEU_BACKEND_URL/api';
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --primary-color: #8b6f47;
    --secondary-color: #d4a574;
    --accent-color: #b76e79;
    /* ... */
}
```

### Logo

Substitua o emoji 💎 nas páginas HTML pela sua logo:

```html
<h1>💎 Gabriela</h1>
<!-- Para -->
<h1><img src="assets/img/logo.png" alt="Gabriela"></h1>
```

## 🌐 Deploy

### GitHub Pages

1. **Configure o repositório**
```bash
git add frontend/
git commit -m "feat: adicionar painel administrativo"
git push origin main
```

2. **Ative o GitHub Pages**
- Vá em Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: /frontend
- Save

3. **Acesse**
```
https://avilaops.github.io/gabriela/login.html
```

### Netlify

1. **Deploy direto pelo Git**
```bash
# Connect ao Netlify
netlify init

# Configure
Build command: (deixe vazio)
Publish directory: frontend
```

2. **Ou arraste a pasta**
- Acesse [netlify.com](https://netlify.com)
- Arraste a pasta `frontend/`
- Pronto!

### Vercel

```bash
cd frontend
vercel
```

## 📱 Responsividade

O painel é **totalmente responsivo**:

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1366px)
- ✅ Mobile (320px - 768px)

## 🔐 Segurança

- ✅ Token JWT armazenado em localStorage
- ✅ Proteção de rotas no client-side
- ✅ Validação de formulários
- ✅ Sanitização de inputs
- ⚠️ **Importante:** Implementar HTTPS em produção

## 🧪 Testes

### Testar Localmente

1. Inicie o backend:
```bash
cd backend
npm run dev
```

2. Inicie o frontend:
```bash
cd frontend
python -m http.server 8000
```

3. Acesse: `http://localhost:8000/login.html`

## 📚 Dependências

### CDNs Utilizadas

- **Google Fonts:** Inter
- **Iconoir:** Ícones SVG
- **Chart.js:** Gráficos (futuro)

Todas as dependências são carregadas via CDN para facilitar o deploy.

## 🎯 Próximos Passos

- [ ] Completar módulos restantes (Agenda, Clientes, etc.)
- [ ] Adicionar upload de fotos
- [ ] Implementar calendário interativo
- [ ] Adicionar gráficos com Chart.js
- [ ] Sistema de notificações
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Integração WhatsApp

## 🤝 Contribuindo

Frontend desenvolvido seguindo os padrões:

- HTML5 semântico
- CSS3 com variáveis e flexbox/grid
- JavaScript Vanilla (ES6+)
- Mobile-First approach
- Performance otimizada

## 📄 Licença

© 2025 Ávila.inc - Todos os direitos reservados.

---

**Desenvolvido com 💜 por Ávila.inc**
