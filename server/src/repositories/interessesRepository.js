import { pool } from '../database/pool.js';

export async function create(data) {
  const result = await pool.query(
    `INSERT INTO interesses_doacao (necessidade_id, nome_doador, contato, quantidade)
     VALUES ($1, $2, $3, $4)
     RETURNING id, necessidade_id AS "necessidadeId", nome_doador AS "nomeDoador",
       contato, quantidade, status, created_at AS "createdAt"`,
    [data.necessidadeId, data.nomeDoador, data.contato, data.quantidade],
  );
  return result.rows[0];
}
