import express, { RequestHandler } from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import { createCar } from './mutations/create-car';
import { deleteCar } from './mutations/delete-car';
import { upadateCar } from './mutations/update-car';

import { getCar } from './queries/get-car';
import { getCars } from './queries/get-cars';

const carsRouter = express.Router();

carsRouter.get('/', getCars);
carsRouter.get('/:id', getCar);

carsRouter.post('/', authMiddleware, createCar);
carsRouter.patch('/:id', authMiddleware, upadateCar as RequestHandler);
carsRouter.delete('/:id', authMiddleware, deleteCar as RequestHandler);

export default carsRouter;
