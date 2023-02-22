import { RequestHandler } from 'express';
import cars from './cars-data';

export const getCars: RequestHandler<
{}, // Parametrai
CarModel[], // Atsakymo tipas
{}, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = (req, res) => {
  res.status(200).json(cars);
};
