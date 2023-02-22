import express from 'express';
import {
 createCar, getCar, getCars,
} from '../controllers/cars-controller';
import { deleteCar } from '../controllers/cars-controller/mutations/delete-car';
import { upadateCar } from '../controllers/cars-controller/mutations/update-car';

const carsRouter = express.Router();

carsRouter.get('/', getCars);
carsRouter.get('/:id', getCar);

carsRouter.post('/', createCar);
carsRouter.delete('/:id', deleteCar);
carsRouter.patch('/:id', upadateCar);

export default carsRouter;
