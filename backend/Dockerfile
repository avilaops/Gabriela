# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar dependências do builder
COPY --from=builder /app/node_modules ./node_modules

# Copiar código da aplicação
COPY --chown=nodejs:nodejs . .

# Mudar para usuário não-root
USER nodejs

# Expor porta
EXPOSE 3001

# Variáveis de ambiente
ENV NODE_ENV=production \
    PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Iniciar aplicação
CMD ["node", "server.js"]
