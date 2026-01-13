import { autor } from "../models/Autor.js";
import { isValidObjectId, sanitizeObject } from "../middlewares/validation.js";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarAutorPorId (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const autorEncontrado = await autor.findById(id);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
    }
  };

  static async cadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const autorExistente = await autor.findById(id);
      if (!autorExistente) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      // Sanitiza o body para prevenir injeção NoSQL
      const dadosSanitizados = sanitizeObject(req.body);
      await autor.findByIdAndUpdate(id, dadosSanitizados);
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirAutor (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const autorExistente = await autor.findById(id);
      if (!autorExistente) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
};

export default AutorController;
