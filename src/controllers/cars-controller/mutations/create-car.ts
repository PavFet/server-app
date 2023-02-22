import { RequestHandler } from 'express';
import * as yup from 'yup';
import createId from 'uniqid';
import cars from '../cars-data';
import { CarData } from '../types';
import { carDataValidationSchema } from '../validation-schemas/car-data-validation-schema';

export const createCar: RequestHandler<
{}, // Parametrai
CarModel | ResponseError, // Atsakymo tipas
CarData, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = (req, res) => {
  try {
    const carData = carDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newCar: CarModel = { id: createId(), ...carData };
    cars.push(newCar);

    res.status(201).json(newCar);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation error' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
