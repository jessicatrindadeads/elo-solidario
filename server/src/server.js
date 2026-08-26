import { createApp } from './app.js';
import { env, validateEnvironment } from './config/env.js';

validateEnvironment();

const app = createApp();

app.listen(env.port, () => {
  console.log(`Elo Solidário API disponível na porta ${env.port}.`);
});
