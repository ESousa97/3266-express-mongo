# Projeto Alura Criando uma API Rest com Express e MongoDB

Este projeto consiste em uma aplicação web desenvolvida em Node.js com Express, destinada ao gerenciamento de livros e autores em uma livraria. Utiliza MongoDB como banco de dados para armazenar informações relativas a livros e autores.

## Características

- Cadastro, atualização e remoção de livros e autores.
- Busca de livros por editora e ID.
- Listagem de autores e livros.
- Conexão segura ao banco de dados com variáveis de ambiente.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express.js:** Framework web utilizado para construir a API.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenamento de dados.
- **Mongoose:** ODM (Object Data Modeling) utilizado para modelagem dos dados e conexão ao MongoDB.

## Estrutura do Projeto

- **`app.js`:** Configura e inicializa o servidor Express e a conexão com o banco de dados.

- **`dbConnect.js`:** Gerencia a conexão com o banco de dados MongoDB.

- **`routes/`:** Contém as rotas para gerenciamento de livros (`livrosRoutes.js`) e autores (`autoresRoutes.js`).
- **`models/`:** Modelos de dados para Autores (`Autor.js`) e Livros (`Livros.js`).

- **`controllers/`:** Controladores para lógica de negócio envolvendo Autores (`autorController.js`) e Livros (`livroController.js`).

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
4. Configure as variáveis de ambiente no arquivo `.env`:

   ```plaintext
   DB_CONNECTION_STRING=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/meu_banco_de_dados
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`.

# Endpoints

### A API possui os seguintes endpoints:

#### Para Autores:

- `GET /autores`: Listar todos os autores.

- `GET /autores/`: Obter um autor específico pelo ID.

- `POST /autores`: Cadastrar um novo autor.

- `PUT /autores/`: Atualizar os dados de um autor específico.

- `DELETE /autores/`: Excluir um autor pelo ID.

#### Para Livros:

`GET /livros:` Listar todos os livros.

`GET /livros/busca:` Listar livros por editora especificada na query (exemplo: `/livros/busca?editora=NomeEditora`).

`GET /livros/:` Obter um livro específico pelo ID.

`POST /livros:` Cadastrar um novo livro.

`PUT /livros/:` Atualizar os dados de um livro específico.

`DELETE /livros/:` Excluir um livro pelo ID.

#### Rota Geral:

`GET /` - Retorna uma mensagem de boas-vindas, indicando que a aplicação está operacional.

#

### Autor

- José Enoque