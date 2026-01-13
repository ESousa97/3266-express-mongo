/**
 * @fileoverview Testes unitários para AutorController
 */

import { jest } from "@jest/globals";

// Mock do modelo antes de importar o controller
jest.unstable_mockModule("../src/models/Autor.js", () => ({
  autor: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

const { autor } = await import("../src/models/Autor.js");
const { default: AutorController } = await import("../src/controllers/autorController.js");

describe("AutorController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe("listarAutores", () => {
    test("deve retornar lista de autores com status 200", async () => {
      const autoresMock = [
        { nome: "Autor 1", nacionalidade: "Brasileiro" },
        { nome: "Autor 2", nacionalidade: "Americano" }
      ];
      autor.find.mockResolvedValue(autoresMock);

      await AutorController.listarAutores(mockReq, mockRes);

      expect(autor.find).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(autoresMock);
    });

    test("deve retornar erro 500 quando falha", async () => {
      const erro = new Error("Erro de banco");
      autor.find.mockRejectedValue(erro);

      await AutorController.listarAutores(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining("falha na requisição") })
      );
    });
  });

  describe("listarAutorPorId", () => {
    test("deve retornar autor por ID com status 200", async () => {
      const autorMock = { _id: "123", nome: "Autor Teste" };
      mockReq.params.id = "123";
      autor.findById.mockResolvedValue(autorMock);

      await AutorController.listarAutorPorId(mockReq, mockRes);

      expect(autor.findById).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(autorMock);
    });
  });

  describe("cadastrarAutor", () => {
    test("deve criar autor com status 201", async () => {
      const novoAutor = { nome: "Novo Autor", nacionalidade: "Brasileiro" };
      mockReq.body = novoAutor;
      autor.create.mockResolvedValue(novoAutor);

      await AutorController.cadastrarAutor(mockReq, mockRes);

      expect(autor.create).toHaveBeenCalledWith(novoAutor);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });

  describe("atualizarAutor", () => {
    test("deve atualizar autor com status 200", async () => {
      mockReq.params.id = "123";
      mockReq.body = { nome: "Autor Atualizado" };
      autor.findByIdAndUpdate.mockResolvedValue({});

      await AutorController.atualizarAutor(mockReq, mockRes);

      expect(autor.findByIdAndUpdate).toHaveBeenCalledWith("123", { nome: "Autor Atualizado" });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "autor atualizado" });
    });
  });

  describe("excluirAutor", () => {
    test("deve excluir autor com status 200", async () => {
      mockReq.params.id = "123";
      autor.findByIdAndDelete.mockResolvedValue({});

      await AutorController.excluirAutor(mockReq, mockRes);

      expect(autor.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "autor excluído com sucesso" });
    });
  });
});
