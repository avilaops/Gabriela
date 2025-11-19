# Gabriela Backend API

Sistema de gestão completo para estúdio de design de sobrancelhas com integração à API central da Avila.4


## 🚀 Tecnologias

- Node.js + Express
- SQLite (sqlite3)
- JWT Authentication
- RESTful API
- **Integração com Avila API** 🔗

## 📦 Instalação

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env e adicione suas credenciais
```

## 🗄️ Inicializar Banco de Dados

```bash
npm run init-db
```

## ▶️ Executar

```bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start
```

## 🔐 Autenticação

### Registro
```bash
POST /api/auth/register
{
  "name": "Gabriela Silva",
  "email": "gabriela@example.com",
  "password": "senha123",
  "phone": "18999999999"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "gabriela@example.com",
  "password": "senha123"
}
```

### Verificar Token
```bash
GET /api/auth/verify
Headers: { "Authorization": "Bearer <token>" }
```

## 🔄 Sincronização com Avila API

### Sincronizar Cliente
```bash
POST /api/sync/client/:id
```

### Sincronizar Agendamento
```bash
POST /api/sync/appointment/:id
```

### Importar Produtos da Avila
```bash
POST /api/sync/products/import
```

### Enviar Contato
```bash
POST /api/sync/contact
{
  "name": "Cliente",
  "email": "cliente@example.com",
  "message": "Mensagem"
}
```

### Verificar Status
```bash
GET /api/sync/health
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token
- `GET /api/auth/me` - Dados do usuário atual

### Sincronização
- `POST /api/sync/client/:id` - Sincronizar cliente
- `POST /api/sync/appointment/:id` - Sincronizar agendamento
- `POST /api/sync/products/import` - Importar produtos
- `POST /api/sync/contact` - Enviar contato
- `GET /api/sync/health` - Status da API

### Clientes
- `GET /api/clients` - Listar todos os clientes
- `GET /api/clients/:id` - Buscar cliente por ID
- `POST /api/clients` - Criar novo cliente (sync automático)
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente
- `GET /api/clients/filter/vip` - Listar clientes VIP
- `GET /api/clients/:id/history` - Histórico do cliente

### Serviços
- `GET /api/services` - Listar serviços ativos
- `GET /api/services/:id` - Buscar serviço por ID
- `POST /api/services` - Criar novo serviço
- `PUT /api/services/:id` - Atualizar serviço
- `DELETE /api/services/:id` - Desativar serviço

### Agendamentos
- `GET /api/appointments` - Listar agendamentos (query: date, status)
- `GET /api/appointments/:id` - Buscar agendamento por ID
- `POST /api/appointments` - Criar novo agendamento (sync automático)
- `PUT /api/appointments/:id` - Atualizar agendamento
- `PATCH /api/appointments/:id/status` - Atualizar status
- `DELETE /api/appointments/:id` - Deletar agendamento
- `GET /api/appointments/date/today` - Agendamentos de hoje

### Produtos
- `GET /api/products` - Listar produtos ativos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar novo produto
- `POST /api/products/sales` - Registrar venda
- `GET /api/products/sales/all` - Listar vendas

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/dashboard/financial` - Relatório financeiro (query: start_date, end_date)
- `GET /api/dashboard/inactive-clients` - Clientes inativos (query: days)

## 📊 Estrutura do Banco de Dados

- **users** - Profissionais/usuários do sistema
- **clients** - Clientes do estúdio
- **services** - Serviços oferecidos
- **appointments** - Agendamentos
- **appointment_history** - Histórico com fotos antes/depois
- **products** - Produtos, pacotes e vales-presente
- **product_sales** - Vendas de produtos
- **anamnesis** - Fichas de anamnese
- **reminders** - Lembretes e mensagens de marketing
- **client_tags** - Tags/categorias de clientes

## 🔧 Configuração

Edite o arquivo `.env`:

```env
PORT=3000
JWT_SECRET=seu_secret_aqui
NODE_ENV=development
DATABASE_PATH=./database/gabriela.db

# Avila API Integration
AVILA_API_KEY=your_avila_api_key_here
SYNC_ENABLED=true
```

## ✨ Funcionalidades de Integração

### 1. Autenticação Centralizada
- Sistema JWT próprio
- Sincronização de usuários com Avila API
- Tokens de acesso seguros

### 2. Sincronização Automática
- Clientes sincronizados automaticamente ao criar
- Agendamentos enviados para sistema central
- Importação de produtos da Avila
- Sincronização em background (não bloqueia operações)

### 3. Sistema de Contatos
- Envio de contatos para sistema central da Avila
- Integração com CRM corporativo
- Rastreamento de origem (gabriela)

## 🎯 Próximos Passos

1. Obter API Key da Avila
2. Configurar variáveis de ambiente
3. Testar sincronização
4. Implementar webhook para notificações

## 📝 Licença

MIT
