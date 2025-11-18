# 🚀 Deploy do Backend Gabriela

## Pré-requisitos

- [x] Node.js 18+ instalado
- [x] Conta MongoDB Atlas configurada
- [x] Conta Azure (para deploy em produção)
- [x] Repositório GitHub configurado

## 📋 Checklist de Deploy

### 1. Configuração Local

#### Instalar dependências
```bash
cd backend
npm install
```

#### Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e preencha:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=sua_connection_string_aqui
JWT_SECRET=seu_secret_aqui
AVILA_API_KEY=sua_api_key_aqui
```

#### Liberar IP no MongoDB Atlas
1. Acesse https://cloud.mongodb.com
2. Network Access → Add IP Address
3. Add Current IP Address (para desenvolvimento)
4. Allow Access from Anywhere (para CI/CD)

Veja detalhes em `docs/MONGODB_SETUP.md`

#### Popular banco de dados
```bash
npm run seed
```

#### Testar localmente
```bash
npm run dev
```

Acesse http://localhost:3001/health para verificar

### 2. Configuração do GitHub

#### Adicionar secrets no repositório
No GitHub, vá para **Settings → Secrets and variables → Actions**

Adicione todos os secrets listados em `.github/SECRETS.md`:
- `MONGODB_URI`
- `JWT_SECRET`
- `AVILA_API_KEY`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_SUBSCRIPTION_ID`
- `ACR_USERNAME`
- `ACR_PASSWORD`

#### Verificar workflows
```bash
git add .
git commit -m "feat: configure MongoDB and GitHub Actions"
git push origin main
```

Os workflows serão executados automaticamente:
- ✅ **CI**: Testes e lint (em PRs e develop)
- ✅ **Deploy**: Build e deploy no Azure (em push na main)
- ✅ **Health Check**: Verificação diária do MongoDB

### 3. Deploy no Azure

#### Opção A: Automático via GitHub Actions
Quando você fizer push na branch `main` com alterações em `backend/`, o workflow `deploy-backend.yml` será executado automaticamente.

#### Opção B: Manual via Azure CLI

##### Criar Container Registry (se não existir)
```bash
az acr create \
  --name avilacontainerregistry \
  --resource-group avila-resources \
  --sku Basic \
  --admin-enabled true
```

##### Build e push da imagem
```bash
cd backend
az acr build \
  --registry avilacontainerregistry \
  --image gabriela-backend:latest \
  .
```

##### Criar Container App Environment
```bash
az containerapp env create \
  --name avila-env \
  --resource-group avila-resources \
  --location eastus
```

##### Criar Container App
```bash
az containerapp create \
  --name gabriela-api \
  --resource-group avila-resources \
  --environment avila-env \
  --image avilacontainerregistry.azurecr.io/gabriela-backend:latest \
  --registry-server avilacontainerregistry.azurecr.io \
  --registry-username <ACR_USERNAME> \
  --registry-password <ACR_PASSWORD> \
  --target-port 3001 \
  --ingress external \
  --env-vars \
    NODE_ENV=production \
    PORT=3001 \
    MONGODB_URI=secretref:mongodb-uri \
    JWT_SECRET=secretref:jwt-secret \
    AVILA_API_KEY=secretref:avila-api-key \
  --secrets \
    mongodb-uri="<MONGODB_URI>" \
    jwt-secret="<JWT_SECRET>" \
    avila-api-key="<AVILA_API_KEY>"
```

### 4. Verificação

#### Verificar saúde da aplicação
```bash
curl https://gabriela-api.azurecontainerapps.io/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Gabriela API está funcionando!",
  "database": "connected"
}
```

#### Verificar logs
```bash
az containerapp logs show \
  --name gabriela-api \
  --resource-group avila-resources \
  --follow
```

#### Testar endpoints
```bash
# Listar serviços
curl https://gabriela-api.azurecontainerapps.io/api/services

# Login
curl -X POST https://gabriela-api.azurecontainerapps.io/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gabriela.com","password":"gabriela2025"}'
```

### 5. Monitoramento

#### GitHub Actions
- Acesse a aba **Actions** do repositório
- Verifique o status dos workflows
- Logs detalhados de cada execução

#### Azure Portal
- Acesse https://portal.azure.com
- Navegue até Container Apps → gabriela-api
- Verifique:
  - Application health
  - Logs
  - Metrics
  - Revisions

#### MongoDB Atlas
- Acesse https://cloud.mongodb.com
- Verifique métricas:
  - Connections
  - Operations
  - Storage

## 🔄 Atualizações

Para atualizar o backend em produção:

1. Faça alterações no código
2. Commit e push para `main`:
```bash
git add .
git commit -m "feat: sua alteração"
git push origin main
```

3. O GitHub Actions fará deploy automático

## 🆘 Troubleshooting

### Erro de conexão MongoDB
- Verifique se o IP está liberado no Atlas
- Teste a connection string localmente
- Verifique os logs: `az containerapp logs show`

### Erro de autenticação Azure
- Verifique se os secrets estão corretos
- Recrie o service principal se necessário

### Container não inicia
- Verifique as variáveis de ambiente
- Confira os logs de build no GitHub Actions
- Teste o Dockerfile localmente:
```bash
docker build -t gabriela-backend .
docker run -p 3001:3001 --env-file .env gabriela-backend
```

## 📚 Documentação Adicional

- [MongoDB Setup](MONGODB_SETUP.md)
- [GitHub Secrets](.github/SECRETS.md)
- [API Documentation](API.md)
