import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { routes } from './routes/index.js';
import { AppError } from './shared/AppError.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.frontendUrl }));
  app.use(express.json({ limit: '100kb' }));
  app.use('/api', routes);

  app.use((_request, _response, next) => {
    next(new AppError('Rota não encontrada.', 404));
  });

  app.use((error, _request, response, _next) => {
    if (error.code === '23505') {
      return response.status(409).json({ error: 'Este registro já existe.' });
    }
    if (error.code === '23503') {
      return response.status(409).json({ error: 'O registro possui dados relacionados.' });
    }

    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Erro interno do servidor.' : error.message;
    if (statusCode === 500) console.error(error);

    return response.status(statusCode).json({ error: message, details: error.details });
  });

  return app;
}
