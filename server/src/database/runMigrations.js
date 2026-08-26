import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';

const migrationsUrl = new URL('../../migrations/', import.meta.url);

export async function runMigrations() {
  const migrationsPath = fileURLToPath(migrationsUrl);
  const files = (await readdir(migrationsPath))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const migration = await readFile(new URL(file, migrationsUrl), 'utf8');
    await pool.query(migration);
  }
}
