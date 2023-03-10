import { CarViewModel } from 'cars/types';
import { RequestHandler } from 'express';
import ErrorService from '../../services/error-service';
import CarsModel from '../model';

export const getCars: RequestHandler<
{}, // Parametrai
CarViewModel[] | ResponseError, // Atsakymo tipas
{}, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = async (req, res) => {
  try {
    const cars = await CarsModel.getCars();
     res.status(200).json(cars);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
