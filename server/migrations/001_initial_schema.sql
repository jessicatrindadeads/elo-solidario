CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS necessidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item VARCHAR(120) NOT NULL,
  categoria VARCHAR(60) NOT NULL,
  local VARCHAR(160) NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  unidade VARCHAR(30) NOT NULL,
  prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('urgente', 'importante', 'normal')),
  status VARCHAR(20) NOT NULL DEFAULT 'aberta' CHECK (status IN ('aberta', 'atendida', 'cancelada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS voluntarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  telefone VARCHAR(30) NOT NULL,
  disponibilidade VARCHAR(20) NOT NULL CHECK (disponibilidade IN ('manha', 'tarde', 'noite', 'integral')),
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interesses_doacao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  necessidade_id UUID NOT NULL REFERENCES necessidades(id) ON DELETE RESTRICT,
  nome_doador VARCHAR(120) NOT NULL,
  contato VARCHAR(160) NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  status VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_necessidades_filtros
  ON necessidades (status, prioridade, categoria);

CREATE INDEX IF NOT EXISTS idx_interesses_necessidade
  ON interesses_doacao (necessidade_id);
