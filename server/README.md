# Elo Solidário API

API REST do Elo Solidário, construída com Node.js, Express e PostgreSQL.

## Execução local

1. Copie `.env.example` para `.env` e configure `DATABASE_URL`.
2. Instale as dependências com `npm install`.
3. Crie as tabelas com `npm run db:migrate`.
4. Inicie a API com `npm run dev`.

A API ficará disponível em `http://localhost:3333/api`.

## Deploy recomendado

O arquivo `render.yaml` na raiz do projeto configura a API para o Render. No serviço publicado, informe `DATABASE_URL` com a connection string do projeto PostgreSQL no Supabase. O Render executará a migration antes de iniciar a API.

A coleção para importação no Postman está em `server/postman/Elo-Solidario-API.postman_collection.json`.

## Endpoints iniciais

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/api/health` | Verificar a API |
| GET | `/api/necessidades` | Listar e filtrar necessidades |
| GET | `/api/necessidades/:id` | Consultar uma necessidade |
| POST | `/api/necessidades` | Cadastrar uma necessidade |
| PUT | `/api/necessidades/:id` | Atualizar uma necessidade |
| DELETE | `/api/necessidades/:id` | Excluir uma necessidade |
| GET | `/api/voluntarios` | Listar voluntários |
| POST | `/api/voluntarios` | Cadastrar um voluntário |
| POST | `/api/interesses-doacao` | Registrar interesse em doar |

Filtros aceitos em `GET /api/necessidades`: `busca`, `categoria`, `prioridade` e `status`.
