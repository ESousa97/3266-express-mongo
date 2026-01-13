import rateLimit from "express-rate-limit";

/**
 * Rate limiter padrão para rotas da API
 * Limita a 100 requisições por IP a cada 15 minutos
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requisições por janela
  message: {
    message: "Muitas requisições deste IP, tente novamente após 15 minutos"
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter mais restritivo para operações de escrita
 * Limita a 20 requisições por IP a cada 15 minutos
 */
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // máximo de 20 requisições por janela
  message: {
    message: "Muitas operações de escrita deste IP, tente novamente após 15 minutos"
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter para listagens
 * Limita a 50 requisições por IP a cada 15 minutos
 */
export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // máximo de 50 requisições por janela
  message: {
    message: "Muitas requisições de leitura deste IP, tente novamente após 15 minutos"
  },
  standardHeaders: true,
  legacyHeaders: false
});
