# MongoDB Atlas - Configuração de IP Whitelist

## Problema
O MongoDB Atlas bloqueia conexões de IPs não autorizados por segurança.

## Solução

### 1. Acessar MongoDB Atlas
1. Acesse https://cloud.mongodb.com
2. Faça login com suas credenciais
3. Selecione o projeto correto

### 2. Configurar Network Access
1. No menu lateral, clique em **Network Access**
2. Clique em **Add IP Address**
3. Escolha uma das opções:

#### Opção A: Permitir seu IP atual
- Clique em **Add Current IP Address**
- Confirme

#### Opção B: Permitir qualquer IP (desenvolvimento)
⚠️ **Use apenas para desenvolvimento/testes**
- Clique em **Allow Access from Anywhere**
- Isso adiciona `0.0.0.0/0`
- Confirme

#### Opção C: Adicionar IPs específicos
- Digite o IP manualmente
- Para Azure Container Apps, adicione os IPs de saída do Azure
- Para GitHub Actions, adicione `0.0.0.0/0` temporariamente

### 3. Verificar Conexão
Após adicionar o IP, aguarde ~1 minuto e teste:

```bash
npm run seed
```

## Para Produção (Azure)

Quando fazer deploy no Azure Container Apps:

1. Obtenha os IPs de saída da sua Container App:
```bash
az containerapp show \
  --name gabriela-api \
  --resource-group avila-resources \
  --query "properties.outboundIpAddresses"
```

2. Adicione cada IP no MongoDB Atlas Network Access

## Alternativa: Usar MongoDB Connection String com retry

A connection string já está configurada com `retryWrites=true&w=majority` para melhor confiabilidade.

## Verificar Status

Para verificar se consegue conectar:
```bash
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Conectado')).catch(err => console.error('❌ Erro:', err.message))"
```

## GitHub Actions

Para os workflows funcionarem, você deve:
1. Permitir `0.0.0.0/0` no MongoDB Atlas (todos os IPs)
   - OU
2. Usar MongoDB Atlas com VPC Peering (plano pago)

A opção mais simples para CI/CD é permitir todos os IPs no MongoDB Atlas.
