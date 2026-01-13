import mongoose from "mongoose";

/**
 * Valida se uma string é um ObjectId válido do MongoDB
 * @param {string} id - ID a ser validado
 * @returns {boolean} - true se for válido
 */
export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) &&
    new mongoose.Types.ObjectId(id).toString() === id;
}

/**
 * Middleware para validar ObjectId nos parâmetros da requisição
 * Protege contra injeção de NoSQL
 */
export function validateObjectId(paramName = "id") {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({
        message: `Parâmetro '${paramName}' é obrigatório`
      });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `'${paramName}' inválido. Deve ser um ObjectId válido do MongoDB`
      });
    }

    next();
  };
}

/**
 * Sanitiza strings para prevenir injeção
 * @param {string} input - String a ser sanitizada
 * @returns {string} - String sanitizada
 */
export function sanitizeString(input) {
  if (typeof input !== "string") return input;
  // Remove caracteres que podem ser usados em injeção NoSQL
  return input.replace(/[${}]/g, "");
}

/**
 * Middleware para sanitizar query strings
 */
export function sanitizeQuery(req, res, next) {
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === "string") {
        req.query[key] = sanitizeString(req.query[key]);
      }
    });
  }
  next();
}
