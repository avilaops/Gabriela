# 🤝 Guia de Contribuição - gabriela

Obrigado por considerar contribuir com o gabriela! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)
- [Pull Requests](#pull-requests)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)

## 🚀 Como Contribuir

1. **Fork o repositório**
2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/gabriela.git
   cd gabriela
   ```
3. **Crie uma branch**
   ```bash
   git checkout -b feature/minha-feature
   ```
4. **Faça suas alterações**
5. **Teste localmente**
   ```bash
   cd backend
   npm install
   npm test
   npm run dev
   ```
6. **Commit suas mudanças**
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```
7. **Push para seu fork**
   ```bash
   git push origin feature/minha-feature
   ```
8. **Abra um Pull Request**

## 🐛 Reportar Bugs

Antes de reportar um bug, verifique se ele já não foi reportado em [Issues](https://github.com/avilaops/gabriela/issues).

**Template de Bug Report:**

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Para Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Versão: [e.g. 1.0.0]
```

## 💡 Sugerir Melhorias

Use [Issues](https://github.com/avilaops/gabriela/issues) com a label `enhancement`.

**Template:**

```markdown
**Descrição**
Descrição clara da melhoria proposta.

**Motivação**
Por que essa melhoria é importante?

**Solução Proposta**
Como você imagina a implementação?

**Alternativas**
Outras abordagens consideradas.
```

## 🔄 Pull Requests

### Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Commit messages seguem convenção
- [ ] Build passa sem erros
- [ ] Sem conflitos com `main`

### Review Process

1. **Automated checks** - CI deve passar
2. **Code review** - Pelo menos 1 aprovação
3. **Testing** - Manual se necessário
4. **Merge** - Squash and merge

## 📝 Padrões de Código

### JavaScript/Node.js

```javascript
// ✅ Bom
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// ❌ Ruim
function getUser(id) {
  return User.findById(id);
}
```

### CSS

```css
/* ✅ Bom - BEM naming */
.card__title {
  font-size: 1.5rem;
  color: var(--primary-color);
}

/* ❌ Ruim */
.cardTitle {
  font-size: 24px;
  color: #b76e79;
}
```

### Variáveis de Ambiente

```bash
# ✅ Sempre use .env
MONGODB_URI=mongodb://...
JWT_SECRET=secret

# ❌ Nunca hardcode
const mongoUri = "mongodb://...";
```

## 📦 Commits

### Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adicionar/corrigir testes
- `chore`: Tarefas de build, configs, etc

### Exemplos

```bash
feat(auth): adiciona autenticação JWT
fix(api): corrige validação de email
docs: atualiza README com instruções de deploy
style: formata código com prettier
refactor(database): melhora queries do MongoDB
test(users): adiciona testes unitários
chore(deps): atualiza dependências
```

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Escrever Testes

```javascript
describe('User Service', () => {
  it('should create a new user', async () => {
    const user = await createUser({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Test User');
  });
});
```

## 📚 Documentação

- Documente funções complexas
- Atualize README se necessário
- Adicione JSDoc para APIs públicas

```javascript
/**
 * Cria um novo agendamento
 * @param {Object} data - Dados do agendamento
 * @param {string} data.clientId - ID do cliente
 * @param {string} data.serviceId - ID do serviço
 * @param {Date} data.datetime - Data e hora
 * @returns {Promise<Appointment>} Agendamento criado
 */
async function createAppointment(data) {
  // ...
}
```

## 🏷️ Labels

- `bug` - Algo não está funcionando
- `enhancement` - Nova funcionalidade ou requisição
- `documentation` - Melhorias na documentação
- `good first issue` - Bom para iniciantes
- `help wanted` - Ajuda extra é bem-vinda
- `priority: high` - Alta prioridade
- `wontfix` - Não será trabalhado

## ❓ Dúvidas?

- 📧 Email: dev@avila.inc
- 💬 Discord: [Avila Community](https://discord.gg/avila)
- 🐦 Twitter: [@avilaops](https://twitter.com/avilaops)

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

---

**Obrigado por contribuir com gabriela!** 💜

Feito com ❤️ pela [Ávila.inc](https://avila.inc)
