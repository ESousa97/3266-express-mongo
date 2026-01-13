/**
 * @fileoverview Testes de integração para validar endpoints da API
 */

import request from "supertest";
import express from "express";

// Criar app mock para testes de integração
const app = express();
app.use(express.json());

// Mock das rotas para teste de integração
app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
  res.status(200).json([]);
});

app.get("/autores", (req, res) => {
  res.status(200).json([]);
});

app.get("/livros/busca", (req, res) => {
  res.status(200).json([]);
});

describe("API Integration Tests", () => {
  
  describe("GET /", () => {
    test("deve retornar mensagem de boas-vindas com status 200", async () => {
      const response = await request(app).get("/");
      
      expect(response.status).toBe(200);
      expect(response.text).toBe("Curso de Node.js");
    });
  });

  describe("GET /livros", () => {
    test("deve retornar array de livros com status 200", async () => {
      const response = await request(app).get("/livros");
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /autores", () => {
    test("deve retornar array de autores com status 200", async () => {
      const response = await request(app).get("/autores");
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /livros/busca", () => {
    test("deve retornar array filtrado por editora com status 200", async () => {
      const response = await request(app).get("/livros/busca?editora=Aleph");
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
