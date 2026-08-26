import * as repository from '../repositories/necessidadesRepository.js';
import { AppError } from '../shared/AppError.js';
import { positiveInteger, requireFields, validateEnum } from '../shared/validation.js';

const priorities = ['urgente', 'importante', 'normal'];
const statuses = ['aberta', 'atendida', 'cancelada'];

function validatePayload(body, includeStatus = false) {
  const required = ['item', 'categoria', 'local', 'quantidade', 'unidade', 'prioridade'];
  if (includeStatus) required.push('status');
  requireFields(body, required);
  validateEnum(body.prioridade, priorities, 'prioridade');
  validateEnum(body.status, statuses, 'status');
  return { ...body, quantidade: positiveInteger(body.quantidade, 'quantidade') };
}

export async function index(request, response) {
  validateEnum(request.query.prioridade, priorities, 'prioridade');
  validateEnum(request.query.status, statuses, 'status');
  const data = await repository.list(request.query);
  response.json({ data });
}

export async function show(request, response) {
  const data = await repository.findById(request.params.id);
  if (!data) throw new AppError('Necessidade não encontrada.', 404);
  response.json({ data });
}

export async function store(request, response) {
  const data = await repository.create(validatePayload(request.body));
  response.status(201).json({ data });
}

export async function update(request, response) {
  const data = await repository.update(request.params.id, validatePayload(request.body, true));
  if (!data) throw new AppError('Necessidade não encontrada.', 404);
  response.json({ data });
}

export async function destroy(request, response) {
  const data = await repository.remove(request.params.id);
  if (!data) throw new AppError('Necessidade não encontrada.', 404);
  response.status(204).send();
}
