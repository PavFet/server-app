import { RequestHandler } from 'express';
import cars from '../cars-data';

export const getCar: RequestHandler<
{ id: string | undefined },
CarModel | ResponseError,
{},
{}
> = (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'required id param ' });
    return;
  }

  const foundCar = cars.find((car) => car.id === id);
  if (foundCar === undefined) {
 res.status(400).json({ error: `car was not found with id ${id}` });
   return;
}

  res.status(200).json(foundCar);
};
