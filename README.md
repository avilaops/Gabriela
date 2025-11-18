# 💎 Gabriela

> **Plataforma completa de gestão para profissionais de design de sobrancelhas**  
> _A agenda que vende sozinha_

[![Website](https://img.shields.io/badge/website-gabriela.avila.inc-b76e79)](https://gabriela.avila.inc)
[![Status](https://img.shields.io/badge/status-live-brightgreen)](https://gabriela.avila.inc)
[![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![Node.js](https://img.shields.io/badge/backend-Node.js-339933?logo=node.js)](https://nodejs.org)

---

## 🎯 Sobre o Projeto

**Gabriela** é uma solução SaaS desenvolvida pela [Ávila.inc](https://avila.inc) que transforma a maneira como profissionais de design de sobrancelhas gerenciam seus negócios. Combinando uma landing page otimizada com um painel administrativo completo, a plataforma oferece tudo o que é necessário para profissionalizar o atendimento e aumentar o faturamento.

### 🌐 Acesse Agora
**Landing Page:** [gabriela.avila.inc](https://gabriela.avila.inc)

---

## ✨ Diferenciais da Plataforma

### 1️⃣ Agenda Inteligente
- ✅ Sistema de agendamento online integrado
- ✅ Confirmação automática via WhatsApp
- ✅ Lembretes de consulta programados
- ✅ Política de cancelamento clara
- ✅ Redução de furos e remarcações

**Resultado:** Mais horários preenchidos e menos tempo perdido.

### 2️⃣ Aumento do Ticket Médio
- 💰 Combos de serviços pré-configurados
- 💰 Sugestões automáticas de upgrade
- 💰 Pacotes promocionais personalizados
- 💰 Cross-sell inteligente durante o agendamento

**Resultado:** Maior faturamento por atendimento sem esforço adicional.

### 3️⃣ Visibilidade no Google
- 🔍 SEO otimizado para buscas locais
- 🔍 Presença digital profissional
- 🔍 Botão de contato direto via WhatsApp
- 🔍 Captura de leads qualificados

**Resultado:** Novos clientes encontram você organicamente.

### 4️⃣ Receita Recorrente
- 🎁 Sistema de vale-presente digital
- 🎁 Pacotes pré-pagos com desconto
- 🎁 Produtos digitais (e-books, guias)
- 🎁 Receita antecipada e previsível

**Resultado:** Fluxo de caixa mais saudável e previsível.

---

## 🖥️ Painel Administrativo

O sistema conta com um **painel de controle completo** desenvolvido com as melhores práticas de gestão:

### 📅 Módulo Agenda
- Visualização mensal de todos os horários
- Status de atendimentos (agendado/confirmado/compareceu/faltou)
- Registro detalhado de cada serviço
- Relatórios de taxa de faltas e horários mais produtivos

### 👥 Módulo Clientes (CRM)
- Ficha completa de cada cliente
- Galeria de fotos antes/depois
- Histórico de atendimentos e preferências
- Registro de alergias e tipo de pele
- Tags personalizadas (VIP, sensível, etc.)
- Cálculo de ticket médio por cliente

### 💵 Módulo Financeiro
- Registro rápido de pagamentos
- Relatórios diários, semanais e mensais
- Análise por método de pagamento
- Gráficos de serviços mais rentáveis
- Dashboard financeiro em tempo real

### 📢 Módulo Marketing
- Captura automática de contatos pelo site
- Segmentação de clientes (orçamento, inativos, etc.)
- Templates de mensagens automatizadas
- Campanhas de reativação inteligentes
- Comunicação direcionada e eficaz

### 📄 Módulo Documentos
- Termos de consentimento digital
- Ficha de anamnese online
- Orientações pós-procedimento automáticas
- Proteção jurídica e profissionalização
- Histórico completo armazenado

---

## 🎨 Experiência Premium para Clientes

A plataforma não é apenas um sistema administrativo - é uma **ferramenta de branding**:

- 🌟 Área exclusiva do cliente (portal personalizado)
- 🌟 Acesso ao histórico de atendimentos
- 🌟 Visualização de próximos agendamentos
- 🌟 Galeria de transformações (antes/depois)
- 🌟 Orientações de cuidados sempre disponíveis
- 🌟 Comunicação profissional e organizada

**Transformação:** De "moça da sobrancelha" para **especialista reconhecida** com clínica organizada e marca profissional.

---

## 🛠️ Stack Tecnológica

### Frontend (Landing Page)
```
HTML5 + CSS3 (Custom Design)
JavaScript Vanilla (Performance otimizada)
Responsive Design (Mobile-First)
SEO Optimized
```

### Backend (API REST)
```javascript
Node.js v20+
Express.js 4.x
MongoDB Atlas (Database)
Mongoose ODM 8.x
JWT Authentication
bcryptjs (Segurança)
```

### DevOps & Cloud
```yaml
Platform: Azure Container Apps
Registry: Azure Container Registry
CI/CD: GitHub Actions
Monitoring: Azure Monitor
Database: MongoDB Atlas (Serverless)
```

---

## 📁 Estrutura do Projeto

```
gabriela/
├── 🌐 index.html              # Landing page otimizada
├── 📄 CNAME                   # gabriela.avila.inc
├── 📚 README.md               # Este arquivo
├── 📖 SETUP_COMPLETO.md       # Guia de configuração
├── .github/
│   └── workflows/             # CI/CD automático
│       ├── deploy-backend.yml # Deploy Azure
│       ├── ci.yml             # Testes e lint
│       └── mongodb-health.yml # Health checks
├── backend/
│   ├── 🐳 Dockerfile          # Container config
│   ├── server.js              # Express app
│   ├── database/
│   │   ├── db.js              # MongoDB connection
│   │   ├── init.js            # Inicialização
│   │   └── seed.js            # Dados iniciais
│   ├── models/                # 7 modelos Mongoose
│   │   ├── User.js
│   │   ├── Client.js
│   │   ├── Service.js
│   │   ├── Appointment.js
│   │   ├── Product.js
│   │   ├── ProductSale.js
│   │   └── Anamnesis.js
│   ├── routes/                # 7 APIs REST
│   │   ├── auth.js
│   │   ├── clients.js
│   │   ├── services.js
│   │   ├── appointments.js
│   │   ├── products.js
│   │   ├── dashboard.js
│   │   └── sync.js
│   └── services/
│       ├── authService.js     # Autenticação
│       ├── avilaAPI.js        # Integração Ávila
│       └── syncService.js     # Sincronização
└── docs/
    ├── DEPLOY.md              # Guia de deploy
    └── MONGODB_SETUP.md       # Configuração do banco
```

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+ instalado
- MongoDB Atlas account (gratuito)
- Git configurado

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/avilaops/gabriela.git
cd gabriela/backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Popule o banco de dados (primeira vez)
npm run seed

# Inicie o servidor
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### Endpoints Principais

```
GET  /health                    # Health check
GET  /api/services              # Listar serviços
GET  /api/clients               # Listar clientes
GET  /api/appointments          # Listar agendamentos
POST /api/auth/login            # Login
GET  /api/dashboard/stats       # Estatísticas
```

---

## 📊 Modelos de Dados

### Client (Cliente)
```javascript
{
  name, email, phone, cpf, birthdate,
  address, notes, tags,
  totalSpent, visitCount, lastVisit,
  avilaClientId, active, timestamps
}
```

### Service (Serviço)
```javascript
{
  name, description, duration, price,
  category, active, timestamps
}
```

### Appointment (Agendamento)
```javascript
{
  clientId, serviceId, professionalId,
  datetime, status, notes,
  price, paymentStatus, paymentMethod,
  timestamps
}
```

### Product (Produto/Pacote)
```javascript
{
  name, description, type, price,
  validityDays, sessions, serviceIds,
  stock, active, timestamps
}
```

---

## 🔐 Segurança

- ✅ Autenticação JWT (7 dias de validade)
- ✅ Senhas criptografadas com bcrypt (10 rounds)
- ✅ Variáveis de ambiente protegidas
- ✅ MongoDB com TLS/SSL obrigatório
- ✅ CORS configurado adequadamente
- ✅ Container com usuário não-root
- ✅ Audit de segurança automatizado (CI/CD)

---

## 🔄 CI/CD & Deploy

O projeto possui **deploy automatizado** via GitHub Actions:

### Workflow de Deploy
1. Push para branch `main` com alterações em `backend/**`
2. Build automático da imagem Docker
3. Push para Azure Container Registry
4. Deploy no Azure Container Apps
5. Health check pós-deploy

### Workflow de Testes
- Testes em Node.js 18.x e 20.x
- Lint automático do código
- Security audit com `npm audit`
- Validação de builds

### Monitoramento
- Health check diário do MongoDB
- Notificações via Pulse (webhook)
- Logs estruturados no Azure Monitor

📖 **Guia completo:** Ver `docs/DEPLOY.md`

---

## 🌟 Diferenciais Técnicos

### Performance
- ⚡ MongoDB Atlas com indexes otimizados
- ⚡ Connection pooling configurado
- ⚡ Queries otimizadas com aggregation pipeline
- ⚡ Response time < 200ms (p95)

### Escalabilidade
- 📈 Arquitetura stateless
- 📈 Horizontal scaling ready
- 📈 Database serverless (auto-scaling)
- 📈 Container orchestration (Azure)

### Confiabilidade
- 🛡️ Retry logic em conexões
- 🛡️ Graceful shutdown
- 🛡️ Health checks integrados
- 🛡️ Error handling robusto

---

## 📈 Roadmap

### Em Desenvolvimento
- [ ] Painel web frontend (React/Next.js)
- [ ] Aplicativo móvel (React Native)
- [ ] Integração com pagamentos (Stripe/Mercado Pago)
- [ ] Sistema de notificações push
- [ ] Relatórios avançados com gráficos

### Futuro
- [ ] Multi-tenant (vários profissionais)
- [ ] Marketplace de serviços
- [ ] Programa de indicação
- [ ] Integração com redes sociais
- [ ] Sistema de avaliações

---

## 🤝 Contribuindo

Este é um projeto proprietário da **Ávila.inc**, mas aceitamos sugestões:

1. Abra uma issue descrevendo sua sugestão
2. Aguarde aprovação do time
3. Crie um fork e desenvolva
4. Submeta um pull request

---

## 📞 Suporte & Contato

### Time Ávila.inc
- 🌐 Website: [avila.inc](https://avila.inc)
- 📧 Email: contato@avila.inc
- 💬 WhatsApp: Em breve

### Documentação Adicional
- 📘 [Guia de Deploy](docs/DEPLOY.md)
- 📘 [Configuração MongoDB](docs/MONGODB_SETUP.md)
- 📘 [Setup Completo](SETUP_COMPLETO.md)

---

## 📄 Licença

© 2025 **Ávila.inc** - Todos os direitos reservados.

Este projeto é **proprietário** e seu uso, distribuição ou modificação requer autorização expressa da Ávila.inc.

---

## 🏆 Créditos

**Desenvolvido com 💜 por Ávila.inc**

_Transformando profissionais em marcas, sistemas em experiências._

---

<div align="center">

### ⭐ Se este projeto te inspirou, deixe uma estrela no GitHub!

**[gabriela.avila.inc](https://gabriela.avila.inc)** | **[Ávila.inc](https://avila.inc)**

</div>
