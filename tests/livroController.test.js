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
      const livroMock = { _id: "123", titulo: "Livro Teste" };
      mockReq.params.id = "123";
      livro.findById.mockResolvedValue(livroMock);

      await LivroController.listarLivroPorId(mockReq, mockRes);

      expect(livro.findById).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    });
  });

  describe("excluirLivro", () => {
    test("deve excluir livro com status 200", async () => {
      mockReq.params.id = "123";
      livro.findByIdAndDelete.mockResolvedValue({});

      await LivroController.excluirLivro(mockReq, mockRes);

      expect(livro.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "livro excluído com sucesso" });
    });
  });

  describe("listaLivrosPorEditora", () => {
    test("deve retornar livros filtrados por editora", async () => {
      const livrosMock = [{ titulo: "Livro 1", editora: "Aleph" }];
      mockReq.query.editora = "Aleph";
      livro.find.mockResolvedValue(livrosMock);

      await LivroController.listaLivrosPorEditora(mockReq, mockRes);

      expect(livro.find).toHaveBeenCalledWith({ editora: "Aleph" });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(livrosMock);
    });
  });
});
