# 💜 Gabriela - Sistema de Gestão para Design de Sobrancelhas

[![Deploy Backend](https://github.com/avilaops/gabriela/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/avilaops/gabriela/actions/workflows/deploy-backend.yml)
[![Deploy Pages](https://github.com/avilaops/gabriela/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/avilaops/gabriela/actions/workflows/deploy-pages.yml)
[![CI](https://github.com/avilaops/gabriela/actions/workflows/ci.yml/badge.svg)](https://github.com/avilaops/gabriela/actions/workflows/ci.yml)
[![MongoDB Health](https://github.com/avilaops/gabriela/actions/workflows/mongodb-health.yml/badge.svg)](https://github.com/avilaops/gabriela/actions/workflows/mongodb-health.yml)

> Plataforma SaaS completa para gestão de estúdios de design de sobrancelhas - agendamento inteligente, controle financeiro e automação de marketing.

🌐 **Live:** [gabriela.avila.inc](https://gabriela.avila.inc)

---

## 🎯 Visão Geral

**Gabriela** é uma solução moderna desenvolvida para profissionais de design de sobrancelhas que buscam digitalizar e otimizar a gestão do seu negócio.

### 🌟 Diferenciais

- ✨ Interface moderna e intuitiva
- 📱 100% responsivo (mobile-first)
- 🔒 Segurança JWT + bcrypt
- ⚡ Alta performance (MongoDB Atlas)
- 🤖 Recomendações inteligentes
- 🔌 Integração via MCP (Model Context Protocol)

---

## 🛠️ Stack Tecnológica

**Frontend:**
- HTML5, CSS3, JavaScript Vanilla
- PWA Ready | Google Fonts (Inter) | Iconoir Icons

**Backend:**
- Node.js 20+ | Express.js 4.x
- MongoDB Atlas | Mongoose 8.x
- JWT + bcryptjs

**Cloud & DevOps:**
- GitHub Pages (frontend)
- Azure Container Apps (backend)
- GitHub Actions CI/CD
- Docker | GitHub Container Registry

**Integração:**
- MCP (Model Context Protocol)
- Avila Ecosystem (API Gateway, Portal, Vault)

---

## 📦 Estrutura

```
gabriela/
├── frontend/           # Interface web
│   ├── assets/
│   │   ├── css/       # Estilos
│   │   └── js/        # JavaScript (api.js, auth.js, etc)
│   ├── dashboard.html
│   ├── login.html
│   └── usuarios.html
├── backend/           # REST API
│   ├── database/      # MongoDB config + seed
│   ├── models/        # Mongoose models (7 entidades)
│   ├── routes/        # Endpoints REST
│   ├── services/      # Business logic
│   └── server.js
├── .github/workflows/ # CI/CD (5 pipelines)
├── .mcp/              # Configuração MCP
└── mcp.json
```

---

## ⚡ Início Rápido

### Pré-requisitos

- Node.js 20+ | MongoDB Atlas | Git

### Instalação

```bash
# Clone e configure
git clone https://github.com/avilaops/gabriela.git
cd gabriela/backend

# Configure variáveis (veja seção abaixo)
cp .env.example .env
nano .env

# Instale e inicialize
npm install
npm run seed     # Cria usuário padrão: gabi / gabi@123
npm run dev      # http://localhost:3001
```

### Acesso

```
Login:  gabi
Senha:  gabi@123
```

---

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gabriela

# Security
JWT_SECRET=nsPY6F4IAvxw1epkfHUjTZhdr2SO0Wcu_gabriela_2025_secure

# Avila Ecosystem
AVILA_API_KEY=avila_live_r8LcZho0gc0tlHjalkPC72naLB2YWEAn

# Optional
PULSE_WEBHOOK_URL=https://api.avila.inc/pulse
NOTIFICATIONS_ENABLED=true
```

### GitHub Secrets (para CI/CD)

Configure em `Settings > Secrets and variables > Actions`:

| Secret              | Descrição                           |
| ------------------- | ----------------------------------- |
| `MONGODB_URI`       | Connection string do MongoDB Atlas  |
| `JWT_SECRET`        | Secret para assinar tokens JWT      |
| `AVILA_API_KEY`     | API key do ecossistema Avila        |
| `GH_TOKEN`          | Token GitHub (packages + workflows) |
| `PULSE_WEBHOOK_URL` | Webhook do Avila Pulse (opcional)   |

---

## 📡 API Reference

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
```

### Clientes
```
GET    /api/clients
GET    /api/clients/:id
POST   /api/clients
PUT    /api/clients/:id
DELETE /api/clients/:id
```

### Agendamentos
```
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

### Serviços & Produtos
```
GET    /api/services
GET    /api/products
```

### Dashboard
```
GET    /api/dashboard/stats
```

**Auth:** Todos os endpoints (exceto `/api/auth/*`) requerem header:
```
Authorization: Bearer <token_jwt>
```

---

## 🔌 Integração MCP

O projeto usa **Model Context Protocol** para integração com ferramentas de IA (Claude, GitHub Copilot, etc).

### Configuração

```bash
# Instalar servidores MCP
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-mongodb
npm install -g @modelcontextprotocol/server-filesystem
```

### Uso (Claude Desktop)

Adicione ao `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gabriela": {
      "command": "node",
      "args": ["<path>/backend/server.js"],
      "env": {
        "PORT": "3001",
        "NODE_ENV": "development"
      }
    }
  }
}
```

**Veja `mcp.json` e `.mcp/config.json` para configuração completa.**

---

## 🚀 Deploy

### Frontend (GitHub Pages)

Deploy automático ao fazer push na `main`. Configurado em `.github/workflows/deploy-pages.yml`.

### Backend (Azure Container Apps)

```bash
# Build e push da imagem
docker build -t ghcr.io/avilaops/gabriela-backend:latest ./backend
docker push ghcr.io/avilaops/gabriela-backend:latest
```

Deploy automático via `.github/workflows/deploy-backend.yml` após push de imagem.

---

## 📊 Roadmap

### ✅ Concluído
- [x] Autenticação JWT
- [x] Dashboard com estatísticas
- [x] CRUD de usuários
- [x] CRUD de clientes
- [x] CRUD de serviços e produtos
- [x] Agendamentos
- [x] CI/CD completo (5 workflows)
- [x] Integração MCP

### 🚧 Em Desenvolvimento
- [ ] Agenda visual (calendário)
- [ ] Módulo financeiro completo
- [ ] Marketing via WhatsApp
- [ ] Anamnese digital
- [ ] Relatórios PDF
- [ ] Multi-tenancy

---

## 🔐 Segurança

- Senhas hasheadas (bcrypt, 10 rounds)
- JWT com expiração configurável
- Validação de input (express-validator)
- CORS configurado
- HTTPS obrigatório em produção
- Secrets gerenciados via GitHub/Azure Key Vault

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

**Padrão de commits:** [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📝 Licença

MIT License - veja [LICENSE](LICENSE)

---

## 📞 Contato & Links

**Ávila.inc**
- 🌐 Website: [avila.inc](https://avila.inc)
- 📧 Email: contato@avila.inc
- 🔗 Portal: [portal.avila.inc](https://portal.avila.inc)
- 🔑 Vault: [vault.avila.inc](https://vault.avila.inc)

---

<div align="center">

Feito com 💜 por **Ávila.inc**

© 2025 - Todos os direitos reservados

[Documentação](https://gabriela.avila.inc) • [API](https://api.avila.inc) • [Suporte](mailto:contato@avila.inc)

</div>
