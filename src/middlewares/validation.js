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
 * Sanitiza um objeto recursivamente para prevenir injeção NoSQL
 * Remove propriedades que começam com $ ou contêm caracteres perigosos
 * @param {object} obj - Objeto a ser sanitizado
 * @returns {object} - Objeto sanitizado
 */
export function sanitizeObject(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  const sanitized = {};
  for (const key of Object.keys(obj)) {
    // Rejeita chaves que começam com $ (operadores MongoDB)
    if (key.startsWith("$")) continue;
    // Rejeita chaves que contêm . (acesso a campos aninhados maliciosos)
    if (key.includes(".") && key !== "_id") continue;

    const value = obj[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
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

/**
 * Campos permitidos para atualização de Livro
 * Usa allowlist para garantir que apenas campos válidos sejam atualizados
 */
const LIVRO_ALLOWED_FIELDS = ["titulo", "editora", "preco", "paginas"];

/**
 * Campos permitidos para atualização de Autor
 */
const AUTOR_ALLOWED_FIELDS = ["nome", "nacionalidade"];

/**
 * Extrai apenas campos permitidos de um objeto de forma segura
 * @param {object} source - Objeto fonte (ex: req.body)
 * @param {string[]} allowedFields - Lista de campos permitidos
 * @returns {object} - Objeto apenas com campos permitidos
 */
export function extractAllowedFields(source, allowedFields) {
  const result = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      const value = source[field];

      // Apenas aceita tipos primitivos seguros
      if (typeof value === "string") {
        result[field] = sanitizeString(value);
      } else if (typeof value === "number" && Number.isFinite(value)) {
        result[field] = value;
      } else if (typeof value === "boolean") {
        result[field] = value;
      }
      // Ignora objetos, arrays e outros tipos complexos
    }
  }

  return result;
}

/**
 * Extrai campos seguros para atualização de Livro
 * @param {object} body - req.body
 * @returns {object} - Objeto seguro para update
 */
export function extractLivroFields(body) {
  return extractAllowedFields(body || {}, LIVRO_ALLOWED_FIELDS);
}

/**
 * Extrai campos seguros para atualização de Autor
 * @param {object} body - req.body
 * @returns {object} - Objeto seguro para update
 */
export function extractAutorFields(body) {
  return extractAllowedFields(body || {}, AUTOR_ALLOWED_FIELDS);
}
