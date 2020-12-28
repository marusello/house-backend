import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import HousesController from './controllers/HousesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/houses', HousesController.index);
routes.get('/houses/:id', HousesController.show);
routes.post('/houses', upload.array('images'),HousesController.create);

export default routes;