import { AppError } from './AppError.js';

export function requireFields(body, fields) {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missing.length > 0) {
    throw new AppError('Dados obrigatórios não informados.', 422, { campos: missing });
  }
}

export function validateEnum(value, allowed, field) {
  if (value !== undefined && !allowed.includes(value)) {
    throw new AppError(`Valor inválido para ${field}.`, 422, { campo: field, valoresPermitidos: allowed });
  }
}

export function positiveInteger(value, field) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${field} deve ser um número inteiro maior que zero.`, 422);
  }
  return parsed;
}
