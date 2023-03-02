import { RequestHandler } from 'express';

import CarService from '../../../services/cars-services';

export const getCars: RequestHandler<
{}, // Parametrai
CarModel[], // Atsakymo tipas
{}, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = async (req, res) => {
 const cars = await CarService.getCars();
  res.status(200).json(cars);
};
