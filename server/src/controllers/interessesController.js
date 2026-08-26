import * as interessesRepository from '../repositories/interessesRepository.js';
import * as necessidadesRepository from '../repositories/necessidadesRepository.js';
import { AppError } from '../shared/AppError.js';
import { positiveInteger, requireFields } from '../shared/validation.js';

export async function store(request, response) {
  requireFields(request.body, ['necessidadeId', 'nomeDoador', 'contato', 'quantidade']);
  const necessidade = await necessidadesRepository.findById(request.body.necessidadeId);

  if (!necessidade || necessidade.status !== 'aberta') {
    throw new AppError('Necessidade indisponível para doação.', 404);
  }

  const data = await interessesRepository.create({
    ...request.body,
    quantidade: positiveInteger(request.body.quantidade, 'quantidade'),
  });
  response.status(201).json({ data });
}
