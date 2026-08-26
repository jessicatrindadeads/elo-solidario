import assert from 'node:assert/strict';
import test from 'node:test';
import { positiveInteger, requireFields, validateEnum } from '../src/shared/validation.js';

test('positiveInteger aceita um inteiro positivo', () => {
  assert.equal(positiveInteger('10', 'quantidade'), 10);
});

test('positiveInteger rejeita zero e números decimais', () => {
  assert.throws(() => positiveInteger(0, 'quantidade'), /maior que zero/);
  assert.throws(() => positiveInteger(1.5, 'quantidade'), /maior que zero/);
});

test('requireFields informa todos os campos ausentes', () => {
  assert.throws(
    () => requireFields({ nome: 'Jéssica' }, ['nome', 'email', 'telefone']),
    (error) => error.statusCode === 422 && error.details.campos.length === 2,
  );
});

test('validateEnum rejeita valor fora da lista', () => {
  assert.throws(() => validateEnum('alta', ['urgente', 'normal'], 'prioridade'), /inválido/);
});
