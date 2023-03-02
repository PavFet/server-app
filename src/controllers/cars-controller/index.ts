import express from 'express';
import { createCar } from './mutations/create-car';
import { deleteCar } from './mutations/delete-car';
// import { upadateCar } from './mutations/update-car';
import { getCar } from './queries/get-car';
import { getCars } from './queries/get-cars';

const carsRouter = express.Router();

carsRouter.get('/', getCars);
carsRouter.get('/:id', getCar);

carsRouter.post('/', createCar);
carsRouter.delete('/:id', deleteCar);
// carsRouter.patch('/:id', upadateCar);

export default carsRouter;
