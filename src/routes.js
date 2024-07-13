import { Router } from 'express';

import UsersController from './app/controllers/UsersController.js';
import CategoriasController from './app/controllers/CategoriasController.js';
import PerguntasController from './app/controllers/PerguntasController.js';
import RespostasController from './app/controllers/RespostasController.js';

const routes = Router();

// Rotas para usuários
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);

// Rotas para categorias
routes.get('/categorias', CategoriasController.index);
routes.get('/categorias/:id', CategoriasController.show);
routes.post('/categorias', CategoriasController.store);
routes.put('/categorias/:id', CategoriasController.update);
routes.delete('/categorias/:id', CategoriasController.delete);

// Rotas para perguntas
routes.get('/perguntas', PerguntasController.index);
routes.get('/perguntas/:id', PerguntasController.show);
routes.post('/perguntas', PerguntasController.store);
routes.put('/perguntas/:id', PerguntasController.update);
routes.delete('/perguntas/:id', PerguntasController.delete);

// Rotas para respostas
routes.get('/respostas', RespostasController.index);
routes.get('/respostas/:id', RespostasController.show);
routes.post('/respostas', RespostasController.store);
routes.put('/respostas/:id', RespostasController.update);
routes.delete('/respostas/:id', RespostasController.delete);

export default routes;
