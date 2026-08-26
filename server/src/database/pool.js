import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
  console.error('Erro inesperado no PostgreSQL:', error);
});
