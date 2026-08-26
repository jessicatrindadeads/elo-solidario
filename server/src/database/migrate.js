import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';
import { validateEnvironment } from '../config/env.js';

validateEnvironment();

const migrationUrl = new URL('../../migrations/001_initial_schema.sql', import.meta.url);
const migration = await readFile(fileURLToPath(migrationUrl), 'utf8');

try {
  await pool.query(migration);
  console.log('Banco de dados atualizado com sucesso.');
} finally {
  await pool.end();
}
