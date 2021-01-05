import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import HousesController from './controllers/HousesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/houses', HousesController.index);
routes.get('/houses/:id', HousesController.show);
routes.post('/houses', upload.array('images'),HousesController.create);
routes.post('/users', UsersController.create);
routes.post('/sessions', SessionsController.login);

export default routes;