import { RequestHandler } from 'express';
import CarService from '../../../services/cars-services';

export const getCar: RequestHandler<
{ id: string | undefined },
CarModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }
 try {
  const car = await CarService.getCar(id);
  res.status(200).json(car);
 } catch (error) {
  const message = error instanceof Error ? error.message : 'request error';
  res.status(400).json({ error: message });
 }
};
