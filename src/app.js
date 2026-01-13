import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import routes from "./routes/index.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

// Middlewares de segurança
app.use(helmet()); // Headers de segurança
app.use(mongoSanitize()); // Previne injeção NoSQL
app.use(apiLimiter); // Rate limiting global

routes(app);

export default app;
