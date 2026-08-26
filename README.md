# Elo Solidário

Plataforma Full Stack criada para organizar necessidades de doação em cenários de enchentes e conectar pessoas afetadas, instituições, doadores e voluntários.

O projeto nasceu a partir de um desafio técnico sobre desastres causados por chuvas intensas no Brasil. Entre os problemas apresentados, foi escolhida a **organização de doações**, reduzindo a falta ou o excesso de itens em diferentes locais por meio de informações centralizadas e atualizadas.

## Solução proposta

O Elo Solidário permite:

- consultar necessidades de doação e filtrá-las por item, local, categoria e prioridade;
- cadastrar novas necessidades;
- registrar interesse em realizar uma doação;
- cadastrar voluntários e suas disponibilidades;
- organizar os dados em uma API REST integrada a um banco PostgreSQL.

## Status

🚧 **Em desenvolvimento**

- Front-end React: concluído e publicado.
- API Node.js/Express: estrutura e endpoints iniciais concluídos.
- PostgreSQL: esquema inicial e migration concluídos.
- Integração front-end/API: próxima etapa.
- Documentação Postman: coleção inicial criada.
- Publicação da API e conexão com o PostgreSQL: próxima etapa.

## Estrutura do sistema

### Front-end

Aplicação React com Vite, React Router e Sass Modules. Possui páginas de Home, Doações, Cadastro e Voluntariado, além de menu responsivo, filtros, formulários demonstrativos e página 404.

### Back-end

API REST em Node.js e Express, organizada em rotas, controllers e repositories. Inclui validação de entrada, tratamento centralizado de erros, CORS, Helmet e testes automatizados.

### Banco de dados

PostgreSQL com tabelas para:

- necessidades;
- voluntários;
- interesses em doações.

Relacionamentos, restrições, índices e migration estão em [`server/migrations`](server/migrations).

## Tecnologias

- React e Vite
- JavaScript
- React Router
- Sass Modules
- Node.js e Express
- PostgreSQL e `pg`
- GitHub Actions
- Vercel
- Postman (coleção inicial em `server/postman`)

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- PostgreSQL

### Front-end

```bash
git clone https://github.com/jessicatrindadeads/elo-solidario.git
cd elo-solidario
npm install
npm run dev
```

O front-end será iniciado em `http://localhost:5173`.

### API e banco de dados

```bash
cd server
npm install
```

Copie `server/.env.example` para `server/.env`, configure a conexão PostgreSQL e execute:

```bash
npm run db:migrate
npm run dev
```

A API será iniciada em `http://localhost:3333/api`.

## Endpoints iniciais

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/api/health` | Verificar a disponibilidade da API |
| GET | `/api/necessidades` | Listar e filtrar necessidades |
| GET | `/api/necessidades/:id` | Consultar uma necessidade |
| POST | `/api/necessidades` | Cadastrar uma necessidade |
| PUT | `/api/necessidades/:id` | Atualizar uma necessidade |
| DELETE | `/api/necessidades/:id` | Excluir uma necessidade |
| GET | `/api/voluntarios` | Listar voluntários |
| POST | `/api/voluntarios` | Cadastrar um voluntário |
| POST | `/api/interesses-doacao` | Registrar interesse em doar |

## Testes e qualidade

```bash
npm run lint
npm run build
npm run test:api
```

O GitHub Actions executa essas verificações automaticamente em pushes e pull requests para a `main`.

## Aplicação

[Acessar o Elo Solidário na Vercel](https://elo-solidario.vercel.app)

## Autora

Desenvolvido por [Jéssica Trindade](https://github.com/jessicatrindadeads).
