import { RequestHandler } from 'express';
import ErrorService from '../../services/error-service';
import CarsModel from '../model';

export const getCar: RequestHandler<
{ id: string | undefined },
CarViewModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }
 try {
  const car = await CarsModel.getCar(id);
  res.status(200).json(car);
 } catch (error) {
  const [status, errorResponse] = ErrorService.handleError(error);
  res.status(status).json(errorResponse);
 }
};
