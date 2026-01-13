import express from "express";
import AutorController from "../controllers/autorController.js";
import { validateObjectId } from "../middlewares/validation.js";
import { readLimiter, writeLimiter } from "../middlewares/rateLimiter.js";

const routes = express.Router();

// Rotas de leitura com rate limiting
routes.get("/autores", readLimiter, AutorController.listarAutores);
routes.get("/autores/:id", readLimiter, validateObjectId("id"), AutorController.listarAutorPorId);

// Rotas de escrita com rate limiting mais restritivo e validação
routes.post("/autores", writeLimiter, AutorController.cadastrarAutor);
routes.put("/autores/:id", writeLimiter, validateObjectId("id"), AutorController.atualizarAutor);
routes.delete("/autores/:id", writeLimiter, validateObjectId("id"), AutorController.excluirAutor);

export default routes;
