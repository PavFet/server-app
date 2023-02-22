import { RequestHandler } from 'express';
import cars from '../cars-data';

export const deleteCar: RequestHandler<
{ id: string | undefined },
CarModel | ResponseError,
{},
{}
> = (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'server setup error ' });
    return;
  }

  const foundCarIndex = cars.findIndex((car) => car.id === id);
  if (foundCarIndex === -1) {
 res.status(400).json({ error: `car was not found with id ${id}` });
   return;
}

 const [splicedArray] = cars.splice(foundCarIndex, 1);

  res.status(200).json(splicedArray);
};
