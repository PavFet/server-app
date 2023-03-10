import UserModel from 'auth/model';
import { CarViewModel } from 'cars/types';
import { RequestHandler } from 'express';
import ErrorService, { ForbiddenError, ServerSetupError } from 'services/error-service';
import CarsModel from '../model';

export const deleteCar: RequestHandler<
{ id: string | undefined },
CarViewModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;
try {
  if (id === undefined) throw new ServerSetupError();
  if (req.authData === undefined) throw new ServerSetupError();

  const user = await UserModel.getUserByEmail(req.authData.email);
  const car = await CarsModel.getCar(id);
  console.log(user.id);
  console.log(car);
  if (user.role !== 'ADMIN' && user.id !== car.owner.id) throw new ForbiddenError();
  await CarsModel.deleteCar(id);
  res.status(200).json(car);
} catch (err) {
  const [status, errorResponse] = ErrorService.handleError(err);
  res.status(status).json(errorResponse);
}
};
