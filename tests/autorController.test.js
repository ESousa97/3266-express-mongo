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
      const validObjectId = "507f1f77bcf86cd799439011";
      const autorMock = { _id: validObjectId, nome: "Autor Teste" };
      mockReq.params.id = validObjectId;
      autor.findById.mockResolvedValue(autorMock);

      await AutorController.listarAutorPorId(mockReq, mockRes);

      expect(autor.findById).toHaveBeenCalledWith(validObjectId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(autorMock);
    });

    test("deve retornar erro 400 para ID inválido", async () => {
      mockReq.params.id = "invalid-id";

      await AutorController.listarAutorPorId(mockReq, mockRes);

      expect(autor.findById).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
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
      const validObjectId = "507f1f77bcf86cd799439011";
      mockReq.params.id = validObjectId;
      mockReq.body = { nome: "Autor Atualizado" };
      autor.findById.mockResolvedValue({ _id: validObjectId });
      autor.findByIdAndUpdate.mockResolvedValue({});

      await AutorController.atualizarAutor(mockReq, mockRes);

      // Usa $set com allowlist de campos permitidos
      expect(autor.findByIdAndUpdate).toHaveBeenCalledWith(validObjectId, { $set: { nome: "Autor Atualizado" } });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "autor atualizado" });
    });

    test("deve retornar erro 400 para ID inválido", async () => {
      mockReq.params.id = "invalid-id";
      mockReq.body = { nome: "Autor Atualizado" };

      await AutorController.atualizarAutor(mockReq, mockRes);

      expect(autor.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("excluirAutor", () => {
    test("deve excluir autor com status 200", async () => {
      const validObjectId = "507f1f77bcf86cd799439011";
      mockReq.params.id = validObjectId;
      autor.findById.mockResolvedValue({ _id: validObjectId });
      autor.findByIdAndDelete.mockResolvedValue({});

      await AutorController.excluirAutor(mockReq, mockRes);

      expect(autor.findByIdAndDelete).toHaveBeenCalledWith(validObjectId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "autor excluído com sucesso" });
    });

    test("deve retornar erro 400 para ID inválido", async () => {
      mockReq.params.id = "invalid-id";

      await AutorController.excluirAutor(mockReq, mockRes);

      expect(autor.findByIdAndDelete).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
