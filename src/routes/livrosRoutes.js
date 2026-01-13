import express from "express";
import LivroController from "../controllers/livroController.js";
import { validateObjectId, sanitizeQuery } from "../middlewares/validation.js";
import { readLimiter, writeLimiter } from "../middlewares/rateLimiter.js";

const routes = express.Router();

// Rotas de leitura com rate limiting
routes.get("/livros", readLimiter, LivroController.listarLivros);
routes.get("/livros/busca", readLimiter, sanitizeQuery, LivroController.listaLivrosPorEditora);
routes.get("/livros/:id", readLimiter, validateObjectId("id"), LivroController.listarLivroPorId);

// Rotas de escrita com rate limiting mais restritivo e validação
routes.post("/livros", writeLimiter, LivroController.cadastrarLivro);
routes.put("/livros/:id", writeLimiter, validateObjectId("id"), LivroController.atualizarLivro);
routes.delete("/livros/:id", writeLimiter, validateObjectId("id"), LivroController.excluirLivro);

export default routes;
