import 'dotenv/config';

const required = ['DATABASE_URL'];

export function validateEnvironment() {
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente ausentes: ${missing.join(', ')}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseSsl: process.env.DATABASE_SSL === 'true',
};
