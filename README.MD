# Projeto Alura Criando uma API Rest com Express e MongoDB

Este projeto é uma aplicação web desenvolvida com Node.js e Express, utilizando MongoDB como banco de dados. O foco deste projeto é criar uma API REST para gerenciar um catálogo de livros.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB

## Funcionalidades

- **Listar todos os livros:** Endpoint que retorna todos os livros disponíveis no catálogo.
- **Buscar um livro por ID:** Endpoint que retorna um livro específico baseado no seu ID.
- **Adicionar um livro:** Endpoint para adicionar um novo livro ao catálogo.
- **Atualizar um livro:** Endpoint para atualizar as informações de um livro existente.
- **Remover um livro:** Endpoint para remover um livro do catálogo.

## Instalação

Para rodar este projeto localmente, siga os seguintes passos:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/ESousa97/3266-express-mongo.git]
   ```
2. Instale as dependências:
   ```bash
   cd 3266-express-mongo
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`.

# Endpoints

A API possui os seguintes endpoints:

- `GET /`: Retorna uma mensagem de boas-vindas.
- `GET /livros`: Retorna todos os livros.
- `GET /livros/:id`: Retorna um livro pelo ID.
- `POST /livros`: Adiciona um novo livro.
- `PUT /livros/:id`: Atualiza um livro pelo ID.
- `DELETE /livros/:id`: Remove um livro pelo ID.

#

## Autor

- José Enoque