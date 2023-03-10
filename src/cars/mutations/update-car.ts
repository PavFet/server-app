import { CarViewModel, PartialCarBody } from 'cars/types';
import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from '../../services/error-service';
import CarsModel from '../model';
import partialCarDataValidationSchema from '../validation-schemas/partial-car-data-validation-schema';

export const upadateCar: RequestHandler<
  { id: string | undefined },
  CarViewModel | ResponseError,
  PartialCarBody,
  {}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const partialCarData = partialCarDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );

    const updatedCar = await CarsModel.updateCar(id, partialCarData);

    res.status(200).json(updatedCar);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
