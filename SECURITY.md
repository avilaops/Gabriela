# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Se você descobrir uma vulnerabilidade de segurança no gabriela, por favor nos avise imediatamente:

📧 **Email:** security@avila.inc  
🔒 **Encrypted:** Use nossa [chave PGP](https://avila.inc/.well-known/pgp-key.asc)

### O que esperamos:

- Descrição detalhada da vulnerabilidade
- Passos para reproduzir
- Impacto potencial
- Sugestões de correção (se possível)

### O que você pode esperar:

- Confirmação de recebimento em até 24h
- Atualização sobre o status em até 72h
- Reconhecimento público (se desejar)
- Possível recompensa via bug bounty

## Políticas de Segurança

### Dados Sensíveis

- ✅ Senhas hasheadas com bcrypt (10 rounds)
- ✅ JWT com expiração de 24h
- ✅ HTTPS obrigatório em produção
- ✅ Secrets gerenciados via GitHub/Azure Key Vault
- ✅ Validação de input em todos os endpoints

### Dependências

- Auditoria automática via GitHub Dependabot
- Updates de segurança aplicados em até 48h
- Monitoramento contínuo com Snyk/npm audit

### Infraestrutura

- Container images escaneadas com Trivy
- Logs centralizados no Azure Monitor
- Backup diário do MongoDB Atlas
- Network policies com least privilege

## Hall of Fame

Agradecemos a estes pesquisadores por reportar vulnerabilidades:

_(Nenhum ainda - seja o primeiro!)_

---

**Ávila.inc** - Comprometidos com segurança e privacidade
