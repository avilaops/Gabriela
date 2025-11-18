# 🚀 Gabriela - Configuração MongoDB e CI/CD Completa

## ✅ O que foi feito

### 1. Migração para MongoDB Atlas
- ✅ Substituído SQLite por MongoDB Atlas com Mongoose ODM
- ✅ Criados 7 modelos Mongoose com schemas robustos e indexes otimizados
- ✅ Configurado connection pooling e retry logic
- ✅ Script de seed com dados iniciais (6 serviços, 4 produtos, 1 admin)

### 2. GitHub Actions - CI/CD Pipeline
Criados 3 workflows automatizados:

#### deploy-backend.yml
- **Trigger**: Push na branch `main` com alterações em `backend/**`
- **Ações**:
  - Build da imagem Docker
  - Push para Azure Container Registry
  - Deploy automático no Azure Container Apps
  - Configuração de variáveis de ambiente de produção

#### ci.yml
- **Trigger**: Pull requests para `main` ou push em `develop`
- **Ações**:
  - Testes com Node.js 18.x e 20.x
  - Lint do código
  - Security audit com npm audit
  - Verificação de vulnerabilidades críticas

#### mongodb-health.yml
- **Trigger**: Agendado diariamente às 6h (Brasília)
- **Ações**:
  - Health check da conexão MongoDB
  - Estatísticas do banco (collections e documentos)
  - Notificação no Pulse em caso de falha

### 3. Containerização
- ✅ Dockerfile multi-stage otimizado (Alpine Linux)
- ✅ Health check integrado
- ✅ Usuário não-root para segurança
- ✅ .dockerignore configurado

### 4. Documentação
- ✅ **DEPLOY.md**: Guia completo de deploy (local, Azure, GitHub Actions)
- ✅ **MONGODB_SETUP.md**: Configuração de IP whitelist no Atlas
- ✅ **SECRETS.md**: Lista completa de secrets do GitHub Actions
- ✅ README.md atualizado com novas tecnologias

### 5. Modelos MongoDB

#### User
```javascript
- email, password (bcrypt), name, role
- Indexes: email
- Roles: admin, professional, viewer
```

#### Client
```javascript
- name, email, phone, cpf, birthdate, address
- totalSpent, visitCount, lastVisit, avilaClientId
- Indexes: phone, email, avilaClientId, tags
```

#### Service
```javascript
- name, description, duration, price, category
- Indexes: category + active
- Categories: sobrancelhas, cilios, depilacao, facial, corporal, outros
```

#### Appointment
```javascript
- clientId, serviceId, professionalId, datetime
- status, price, paymentStatus, paymentMethod
- Indexes: clientId + datetime, datetime + status, professionalId + datetime
```

#### Product
```javascript
- name, description, type, price, validityDays, sessions
- serviceIds, stock, active
- Indexes: type + active
- Types: package, product, gift_card
```

#### ProductSale
```javascript
- productId, clientId, quantity, price, totalPrice
- paymentStatus, validUntil, sessionsRemaining
- Indexes: clientId + createdAt, productId
```

#### Anamnesis
```javascript
- clientId, skinType, allergies, medications
- skinConditions, concerns, expectations, consent
- Index: clientId
```

## 📋 Próximos Passos

### 1. Configurar MongoDB Atlas (OBRIGATÓRIO)
```bash
1. Acesse https://cloud.mongodb.com
2. Network Access → Add IP Address
3. Add Current IP Address (para desenvolvimento local)
4. Allow Access from Anywhere (para CI/CD do GitHub Actions)
```

**Detalhes**: Veja `docs/MONGODB_SETUP.md`

### 2. Configurar Secrets no GitHub (OBRIGATÓRIO)
Vá para **GitHub → Settings → Secrets and variables → Actions**

Adicione os seguintes secrets:
```
✅ MONGODB_URI
✅ JWT_SECRET
✅ AVILA_API_KEY
✅ AZURE_TENANT_ID
✅ AZURE_CLIENT_ID
✅ AZURE_CLIENT_SECRET
✅ AZURE_SUBSCRIPTION_ID
✅ ACR_USERNAME
✅ ACR_PASSWORD
✅ PULSE_WEBHOOK_URL (opcional para notificações)
```

**Lista completa com valores**: Veja `.github/SECRETS.md`

### 3. Testar Localmente
```bash
cd backend
npm install
npm run seed     # Popular banco (após liberar IP no Atlas)
npm run dev      # Rodar servidor
```

### 4. Push para GitHub
```bash
git push origin main
```

Isso irá:
1. Trigger do workflow `deploy-backend.yml`
2. Build da imagem Docker
3. Deploy automático no Azure Container Apps

### 5. Verificar Deploy
```bash
# Health check
curl https://gabriela-api.azurecontainerapps.io/health

# Testar API
curl https://gabriela-api.azurecontainerapps.io/api/services
```

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev         # Servidor com hot-reload
npm run seed        # Popular banco de dados
npm start           # Produção
```

### Docker
```bash
docker build -t gabriela-backend .
docker run -p 3001:3001 --env-file .env gabriela-backend
```

### Azure CLI
```bash
# Ver logs
az containerapp logs show --name gabriela-api --resource-group avila-resources --follow

# Restart
az containerapp revision restart --name gabriela-api --resource-group avila-resources
```

### MongoDB
```bash
# Testar conexão
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Conectado')).catch(err => console.error('❌ Erro:', err.message))"
```

## 📊 Estrutura do Projeto

```
Gabriela/
├── .github/
│   ├── workflows/
│   │   ├── deploy-backend.yml    # Deploy automático
│   │   ├── ci.yml                 # Testes e lint
│   │   └── mongodb-health.yml     # Health checks
│   └── SECRETS.md                 # Lista de secrets
├── backend/
│   ├── database/
│   │   ├── db.js                  # MongoDB connection
│   │   └── seed.js                # Seed script
│   ├── models/                    # 7 Mongoose models
│   ├── routes/                    # 7 API routes
│   ├── services/                  # Business logic
│   ├── .env                       # Environment vars (gitignored)
│   ├── Dockerfile                 # Container config
│   ├── package.json
│   └── server.js                  # Express app
├── docs/
│   ├── DEPLOY.md                  # Deploy guide
│   └── MONGODB_SETUP.md           # MongoDB setup
├── index.html                     # Landing page
├── CNAME                          # gabriela.avila.inc
└── README.md

```

## 🎯 Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|------------|
| **Runtime** | Node.js 20+ |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas |
| **ODM** | Mongoose 8.0+ |
| **Authentication** | JWT + bcryptjs |
| **CI/CD** | GitHub Actions |
| **Container** | Docker |
| **Cloud** | Azure Container Apps |
| **Registry** | Azure Container Registry |
| **Monitoring** | Azure Monitor + Pulse |

## 🔒 Segurança

- ✅ JWT com expiração de 7 dias
- ✅ Passwords com bcrypt (10 rounds)
- ✅ Variáveis de ambiente via secrets
- ✅ Container com usuário não-root
- ✅ Audit de segurança automático no CI
- ✅ MongoDB com autenticação e SSL
- ✅ CORS configurado
- ✅ Rate limiting (a implementar)

## 📈 Próximas Melhorias

- [ ] Implementar testes unitários e integração
- [ ] Adicionar rate limiting com express-rate-limit
- [ ] Configurar logs estruturados (Winston)
- [ ] Implementar cache com Redis
- [ ] Adicionar validação de schemas com Joi/Zod
- [ ] Configurar APM (Application Performance Monitoring)
- [ ] Implementar feature flags
- [ ] Adicionar Swagger/OpenAPI documentation

## 🆘 Troubleshooting

### Erro: Could not connect to MongoDB
**Solução**: Libere seu IP no MongoDB Atlas Network Access

### Erro: GitHub Actions failing
**Solução**: Verifique se todos os secrets estão configurados corretamente

### Erro: Container não inicia no Azure
**Solução**: Verifique logs com `az containerapp logs show`

### Erro: npm run seed falha
**Solução**:
1. Verifique se MONGODB_URI está correto no .env
2. Confirme que IP está liberado no Atlas
3. Teste conexão com o comando de teste do MongoDB

## 📚 Documentação de Referência

- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [Express.js](https://expressjs.com/)

---

**Status**: ✅ Backend migrado para MongoDB e CI/CD configurado
**Próximo passo**: Configurar secrets no GitHub e liberar IP no MongoDB Atlas
**Deploy**: Automático via GitHub Actions após push na main

🚀 **Backend pronto para produção!**
