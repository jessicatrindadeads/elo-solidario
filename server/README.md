# Elo Solidário API

API REST do Elo Solidário, construída com Node.js, Express e PostgreSQL.

## Execução local

1. Copie `.env.example` para `.env` e configure `DATABASE_URL`.
2. Instale as dependências com `npm install`.
3. Crie as tabelas com `npm run db:migrate`.
4. Inicie a API com `npm run dev`.

A API ficará disponível em `http://localhost:3333/api`.

## Deploy

O arquivo `render.yaml` na raiz configura a API no plano gratuito do Render. O serviço utiliza o PostgreSQL do Supabase por meio da variável protegida `DATABASE_URL`. A inicialização de produção executa todas as migrations SQL em ordem antes de abrir a API.

API publicada: `https://elo-solidario-api.onrender.com/api`

A coleção para importação no Postman está em `server/postman/Elo-Solidario-API.postman_collection.json`. Ela utiliza a API publicada por padrão; para testes locais, altere a variável `baseUrl` para `http://localhost:3333/api`.

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
