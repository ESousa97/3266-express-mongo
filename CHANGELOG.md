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
