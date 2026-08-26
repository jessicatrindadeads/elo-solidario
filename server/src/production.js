import { createApp } from './app.js';
import { env, validateEnvironment } from './config/env.js';
import { runMigrations } from './database/runMigrations.js';

validateEnvironment();

await runMigrations();
console.log('Banco de dados atualizado com sucesso.');

const app = createApp();

app.listen(env.port, '0.0.0.0', () => {
  console.log(`Elo Solidário API disponível na porta ${env.port}.`);
});
