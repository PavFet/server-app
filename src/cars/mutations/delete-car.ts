import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import CarsModel from '../model';

export const deleteCar: RequestHandler<
{ id: string | undefined },
CarViewModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'server setup error ' });
    return;
  }

try {
  const car = await CarsModel.getCar(id);
  await CarsModel.deleteCar(id);

  res.status(204).json(car);
} catch (err) {
  const [status, errorResponse] = ErrorService.handleError(err);
  res.status(status).json(errorResponse);
}
};
