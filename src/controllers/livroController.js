import { autor } from "../models/Autor.js";
import livro from "../models/Livros.js";
import { isValidObjectId, sanitizeString, sanitizeObject } from "../middlewares/validation.js";

class LivroController {

  static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarLivroPorId (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const livroEncontrado = await livro.findById(id);

      if (!livroEncontrado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  };

  static async cadastrarLivro (req, res) {
    const novoLivro = req.body;
    try {
      // Valida se o autor foi informado e é um ObjectId válido
      if (!novoLivro.autor || !isValidObjectId(novoLivro.autor)) {
        return res.status(400).json({ message: "ID do autor inválido ou não informado" });
      }

      const autorEncontrado = await autor.findById(novoLivro.autor);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  };

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const livroExistente = await livro.findById(id);
      if (!livroExistente) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      // Sanitiza o body para prevenir injeção NoSQL
      const dadosSanitizados = sanitizeObject(req.body);
      await livro.findByIdAndUpdate(id, dadosSanitizados);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;

      // Validação de ObjectId já feita pelo middleware, mas dupla verificação
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const livroExistente = await livro.findById(id);
      if (!livroExistente) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
    
  static async listaLivrosPorEditora (req, res) {
    try {
      // Sanitiza o parâmetro de busca para prevenir injeção NoSQL
      const editoraInput = req.query.editora;

      if (!editoraInput || typeof editoraInput !== "string") {
        return res.status(400).json({ message: "Parâmetro 'editora' é obrigatório e deve ser uma string" });
      }

      // Sanitiza e garante que é uma string simples
      const editora = sanitizeString(String(editoraInput));

      // Usa $eq para garantir comparação exata e segura
      const livrosPorEditora = await livro.find({ editora: { $eq: editora } });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  };
};

export default LivroController;
