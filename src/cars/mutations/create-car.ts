import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import CarsModel from '../model';

import { carDataValidationSchema } from '../validation-schemas/car-data-validation-schema';

export const createCar: RequestHandler<
{}, // Parametrai
CarViewModel | ResponseError, // Atsakymo tipas
CarData, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = async (req, res) => {
  try {
    const carData: CarData = carDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    const createdCar = await CarsModel.createCar(carData);
    res.status(201).json(createdCar);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
