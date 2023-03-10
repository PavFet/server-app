import UserModel from 'auth/model';
import { CarViewModel, PartialCarBody } from 'cars/types';
import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import CarsModel from '../model';

import { carDataValidationSchema } from '../validation-schemas/car-data-validation-schema';

export const createCar: RequestHandler<
{}, // Parametrai
CarViewModel | ResponseError, // Atsakymo tipas
PartialCarBody, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = async (req, res) => {
  try {
    const carData = carDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

    const createdCar = await CarsModel.createCar({ ...carData, ownerId: user.id });
    res.status(201).json(createdCar);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
