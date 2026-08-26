import * as repository from '../repositories/voluntariosRepository.js';
import { requireFields, validateEnum } from '../shared/validation.js';
import { AppError } from '../shared/AppError.js';

const availability = ['manha', 'tarde', 'noite', 'integral'];

export async function index(_request, response) {
  const data = await repository.list();
  response.json({ data });
}

export async function store(request, response) {
  requireFields(request.body, ['nome', 'email', 'telefone', 'disponibilidade']);
  validateEnum(request.body.disponibilidade, availability, 'disponibilidade');

  const email = String(request.body.email).trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new AppError('E-mail inválido.', 422);
  }

  const data = await repository.create({ ...request.body, email });
  response.status(201).json({ data });
}
