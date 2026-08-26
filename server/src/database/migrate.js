import { pool } from './pool.js';
import { validateEnvironment } from '../config/env.js';
import { runMigrations } from './runMigrations.js';

validateEnvironment();

try {
  await runMigrations();
  console.log('Banco de dados atualizado com sucesso.');
} finally {
  await pool.end();
}
