import { Router } from 'express';
import * as necessidades from '../controllers/necessidadesController.js';
import * as voluntarios from '../controllers/voluntariosController.js';
import * as interesses from '../controllers/interessesController.js';
import { asyncHandler } from '../shared/asyncHandler.js';

export const routes = Router();

routes.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'elo-solidario-api' });
});

routes.get('/necessidades', asyncHandler(necessidades.index));
routes.get('/necessidades/:id', asyncHandler(necessidades.show));
routes.post('/necessidades', asyncHandler(necessidades.store));
routes.put('/necessidades/:id', asyncHandler(necessidades.update));
routes.delete('/necessidades/:id', asyncHandler(necessidades.destroy));

routes.get('/voluntarios', asyncHandler(voluntarios.index));
routes.post('/voluntarios', asyncHandler(voluntarios.store));

routes.post('/interesses-doacao', asyncHandler(interesses.store));
