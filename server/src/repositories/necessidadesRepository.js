import { pool } from '../database/pool.js';

const fields = `id, item, categoria, local, quantidade, unidade, prioridade, status,
  created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function list(filters) {
  const conditions = [];
  const values = [];

  if (filters.busca) {
    values.push(`%${filters.busca}%`);
    conditions.push(`(item ILIKE $${values.length} OR local ILIKE $${values.length})`);
  }
  for (const key of ['categoria', 'prioridade', 'status']) {
    if (filters[key]) {
      values.push(filters[key]);
      conditions.push(`${key} = $${values.length}`);
    }
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query(
    `SELECT ${fields} FROM necessidades ${where} ORDER BY created_at DESC`,
    values,
  );
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(`SELECT ${fields} FROM necessidades WHERE id = $1`, [id]);
  return result.rows[0];
}

export async function create(data) {
  const result = await pool.query(
    `INSERT INTO necessidades (item, categoria, local, quantidade, unidade, prioridade)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${fields}`,
    [data.item, data.categoria, data.local, data.quantidade, data.unidade, data.prioridade],
  );
  return result.rows[0];
}

export async function update(id, data) {
  const result = await pool.query(
    `UPDATE necessidades SET item = $1, categoria = $2, local = $3, quantidade = $4,
      unidade = $5, prioridade = $6, status = $7, updated_at = NOW()
     WHERE id = $8 RETURNING ${fields}`,
    [data.item, data.categoria, data.local, data.quantidade, data.unidade, data.prioridade, data.status, id],
  );
  return result.rows[0];
}

export async function remove(id) {
  const result = await pool.query('DELETE FROM necessidades WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
}
