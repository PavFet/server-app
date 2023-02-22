import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import cars from '../cars-data';
import { PartialCarData } from '../types';
import partialCarDataValidationSchema from '../validation-schemas/partial-car-data-validation-schema';

export const upadateCar: RequestHandler<
{ id: string | undefined },
CarModel | ResponseError,
PartialCarData,
{}
> = (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ error: 'server setup error ' });
    return;
  }

  const foundCarIndex = cars.findIndex((car) => car.id === id);
  if (foundCarIndex === -1) {
    res.status(400).json({ error: ' house was not found ' });
      return;
  }

    try {
  const partialCarData = partialCarDataValidationSchema
  .validateSync(req.body, { abortEarly: false });

      const foundCar = cars[foundCarIndex];
      const updatedCar = {
        ...foundCar,
        ...partialCarData,
      };

      cars.splice(foundCarIndex, 1, updatedCar);

      res.status(201).json(updatedCar);
    } catch (err) {
      if (err instanceof ValidationError) {
        const manyErrors = err.errors.length > 1;
        res.status(400).json({
          error: manyErrors ? 'Validation error' : err.errors[0],
          errors: manyErrors ? err.errors : undefined,
        });
      } else if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'Request error' });
      }
    }
};
