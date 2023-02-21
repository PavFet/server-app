import express from 'express';
import { createCar, getCars } from '../controllers';

const carsRouter = express.Router();

carsRouter.get('/', getCars);
carsRouter.post('/', createCar);

export default carsRouter;
