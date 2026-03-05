# 🤝 Guia de Contribuição

> [!WARNING]
> ⚠️ **Projeto Arquivado**
> Este repositório não está mais ativo e permanece público apenas para fins de estudo. Não há garantia de resposta, revisão ou correção para PRs, Issues ou outras contribuições.

Obrigado pelo interesse em contribuir com o projeto **3266-express-mongo**! Este documento fornece as diretrizes para contribuir de forma efetiva.

## 📋 Sumário

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Commits e Pull Requests](#commits-e-pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto adota um Código de Conduta. Ao participar, você concorda em seguir suas diretrizes. Leia [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) para mais detalhes.

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/ESousa97/3266-express-mongo.git
cd 3266-express-mongo

# Adicione o repositório original como upstream
git remote add upstream https://github.com/ESousa97/3266-express-mongo.git
```

### 2. Crie uma Branch

```bash
# Atualize sua branch main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

### 3. Desenvolva

- Escreva código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código do projeto

### 4. Commit e Push

```bash
git add .
git commit -m "feat: descrição da mudança"
git push origin feature/nome-da-feature
```

### 5. Abra um Pull Request

- Vá ao GitHub e abra um PR para a branch `main`
- Preencha o template do PR completamente
- Aguarde a revisão

## 🛠️ Configuração do Ambiente

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Execute em modo desenvolvimento
npm run dev

# Execute os testes
npm test

# Execute o linter
npm run lint
```

## 📐 Padrões de Código

### JavaScript/Node.js

- Use **ES Modules** (`import`/`export`)
- Aspas duplas para strings
- Ponto e vírgula obrigatório
- Indentação de 2 espaços
- Nomes de variáveis em camelCase
- Nomes de classes em PascalCase

### Commits (Conventional Commits)

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

**Exemplos:**

```bash
feat(livros): adiciona endpoint de busca por autor
fix(autores): corrige validação de nome vazio
docs(readme): atualiza instruções de instalação
```

## 🐛 Reportando Bugs

Antes de reportar um bug:

1. Verifique se já não existe uma issue similar
2. Confirme que o bug é reproduzível

Ao criar a issue, inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Versão do Node.js e npm
- Sistema operacional
- Logs de erro (se houver)

## 💡 Sugerindo Melhorias

Sugestões são bem-vindas! Ao propor uma melhoria:

1. Verifique se já não existe uma issue similar
2. Descreva claramente a proposta
3. Explique o benefício esperado
4. Se possível, proponha uma implementação

## ✅ Checklist do Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Lint passa sem erros
- [ ] Testes passam sem erros
- [ ] Commit messages seguem o padrão

---

Dúvidas? Abra uma [Discussion](https://github.com/ESousa97/3266-express-mongo/discussions) ou entre em contato via [LinkedIn](https://www.linkedin.com/in/enoque-sousa-bb89aa168/).
