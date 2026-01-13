/**
 * @fileoverview Testes unitários para LivroController
 */

import { jest } from "@jest/globals";

// Mock do modelo antes de importar o controller
jest.unstable_mockModule("../src/models/Livros.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

jest.unstable_mockModule("../src/models/Autor.js", () => ({
  autor: {
    findById: jest.fn()
  }
}));

const { default: livro } = await import("../src/models/Livros.js");
const { default: LivroController } = await import("../src/controllers/livroController.js");

describe("LivroController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe("listarLivros", () => {
    test("deve retornar lista de livros com status 200", async () => {
      const livrosMock = [
        { titulo: "Livro 1", editora: "Editora A" },
        { titulo: "Livro 2", editora: "Editora B" }
      ];
      livro.find.mockResolvedValue(livrosMock);

      await LivroController.listarLivros(mockReq, mockRes);

      expect(livro.find).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(livrosMock);
    });

    test("deve retornar erro 500 quando falha", async () => {
      const erro = new Error("Erro de banco");
      livro.find.mockRejectedValue(erro);

      await LivroController.listarLivros(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining("falha na requisição") })
      );
    });
  });

  describe("listarLivroPorId", () => {
    test("deve retornar livro por ID com status 200", async () => {
      const validObjectId = "507f1f77bcf86cd799439011";
      const livroMock = { _id: validObjectId, titulo: "Livro Teste" };
      mockReq.params.id = validObjectId;
      livro.findById.mockResolvedValue(livroMock);

      await LivroController.listarLivroPorId(mockReq, mockRes);

      expect(livro.findById).toHaveBeenCalledWith(validObjectId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    });

    test("deve retornar erro 400 para ID inválido", async () => {
      mockReq.params.id = "invalid-id";

      await LivroController.listarLivroPorId(mockReq, mockRes);

      expect(livro.findById).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("excluirLivro", () => {
    test("deve excluir livro com status 200", async () => {
      const validObjectId = "507f1f77bcf86cd799439011";
      mockReq.params.id = validObjectId;
      livro.findByIdAndDelete.mockResolvedValue({});

      await LivroController.excluirLivro(mockReq, mockRes);

      expect(livro.findByIdAndDelete).toHaveBeenCalledWith(validObjectId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "livro excluído com sucesso" });
    });

    test("deve retornar erro 400 para ID inválido", async () => {
      mockReq.params.id = "invalid-id";

      await LivroController.excluirLivro(mockReq, mockRes);

      expect(livro.findByIdAndDelete).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("listaLivrosPorEditora", () => {
    test("deve retornar livros filtrados por editora", async () => {
      const livrosMock = [{ titulo: "Livro 1", editora: "Aleph" }];
      mockReq.query.editora = "Aleph";
      livro.find.mockResolvedValue(livrosMock);

      await LivroController.listaLivrosPorEditora(mockReq, mockRes);

      // Usa $eq para query segura contra NoSQL injection
      expect(livro.find).toHaveBeenCalledWith({ editora: { $eq: "Aleph" } });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(livrosMock);
    });

    test("deve retornar erro 400 quando editora não é informada", async () => {
      mockReq.query = {};

      await LivroController.listaLivrosPorEditora(mockReq, mockRes);

      expect(livro.find).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
