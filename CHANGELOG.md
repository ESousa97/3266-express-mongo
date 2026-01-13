# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- Configuração de ESLint para qualidade de código
- Configuração de Prettier para formatação
- Configuração de Jest para testes automatizados
- Testes unitários básicos para controllers
- GitHub Actions workflow para CI (lint, test, build)
- Dependabot para atualizações automáticas de dependências
- Documentação completa: CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
- EditorConfig para consistência de código
- Arquivo LICENSE (ISC)
- Issue templates e PR template

### Changed
- Atualizado README.md com badges de CI, qualidade e segurança
- Corrigido typo `erro.massage` para `erro.message` nos controllers
- Removido código morto (delete duplicado no app.js)
- Atualizado .gitignore com padrões completos

### Security
- Corrigida vulnerabilidade HIGH no pacote `qs` (CVE-2022-24999)
- Adicionado npm audit no workflow de CI
- **CRITICAL**: Implementado Rate Limiting em todas as rotas da API (12 vulnerabilidades corrigidas)
  - `apiLimiter`: 100 requisições/15min para rotas gerais
  - `readLimiter`: 50 requisições/15min para operações GET
  - `writeLimiter`: 20 requisições/15min para operações POST/PUT/DELETE
- **CRITICAL**: Corrigida vulnerabilidade de NoSQL Injection (6 vulnerabilidades corrigidas)
  - Validação de ObjectId antes de queries no MongoDB
  - Sanitização de inputs do usuário com `express-mongo-sanitize`
  - Validação de parâmetros `editora` para prevenir injeção
- Adicionado `helmet` para headers HTTP seguros
- Criados middlewares de segurança: `validation.js` e `rateLimiter.js`

### Fixed
- Corrigido typo em mensagens de erro dos controllers

## [1.0.0] - 2024-06-09

### Added
- API RESTful completa para gerenciamento de livros
- API RESTful completa para gerenciamento de autores
- Conexão com MongoDB via Mongoose
- Arquitetura em camadas (routes, controllers, models)
- Busca de livros por editora
- Relacionamento autor-livro via embedding
- Configuração via variáveis de ambiente (.env)
- Documentação README completa

[Unreleased]: https://github.com/ESousa97/3266-express-mongo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ESousa97/3266-express-mongo/releases/tag/v1.0.0
