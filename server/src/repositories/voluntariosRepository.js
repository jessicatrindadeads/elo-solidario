import { pool } from '../database/pool.js';

const fields = `id, nome, email, telefone, disponibilidade, ativo,
  created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function list() {
  const result = await pool.query(`SELECT ${fields} FROM voluntarios ORDER BY created_at DESC`);
  return result.rows;
}

export async function create(data) {
  const result = await pool.query(
    `INSERT INTO voluntarios (nome, email, telefone, disponibilidade)
     VALUES ($1, $2, $3, $4) RETURNING ${fields}`,
    [data.nome, data.email, data.telefone, data.disponibilidade],
  );
  return result.rows[0];
}
