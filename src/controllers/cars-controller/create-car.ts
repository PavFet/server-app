import { RequestHandler } from 'express';
import * as yup from 'yup';
import cars from './cars-data';

type CarData = Omit<CarModel, 'id'>;

const carDataValidationSchema: yup.ObjectSchema<CarData> = yup.object({
  name: yup.string()
    .required('name is required')
    .min(2, 'name must have at least 2 symbols')
    .max(50, 'name can\'t have more than 50 symbols'),

  year: yup.number()
    .required('year is required')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),

  origin: yup.string()
    .required('origin is required')
    .min(1, 'origin must have at least 2 symbols')
    .max(4, 'origin can\'t have more than 50 symbols'),

  images: yup.array(yup.string().required())
    .required('images are required')
    .min(1, 'images must have at least one image'),

    technical_characteristics: yup
    .object({
      acceleration: yup.number()
        .required('acceleration is required')
        .min(1, 'acceleration must have min 1 symbol')
        .max(2, 'acceleration must have max 2 symbols'),

        cylinders: yup.number()
        .required('cylinders is required')
        .min(1, 'cylinders must have min 1 symbol')
        .max(2, 'cylinders must have max 2 symbols'),

        displacement: yup.number()
        .required('displacement is required')
        .min(1, 'displacement must have min 1 symbol')
        .max(4, 'displacement must have max 4 symbols'),

        horsepower: yup.number()
        .required('horsepower is required')
        .min(1, 'horsepower must have min 1 symbol')
        .max(4, 'horsepower must have max 4 symbols'),

        miles_per_gallon: yup.number()
        .required('miles per gallon is required')
        .min(1, 'miles per gallon must have min 1 symbol')
        .max(2, 'miles per gallon must have max 2 symbols'),

        weight_in_lbs: yup.number()
        .required('weight in lbs is required')
        .min(4, 'weight in lbs must have min 4 symbol')
        .max(5, 'weight in lbs must have max 5 symbols'),

    }),
});

type PartialCarData = PartialRecursive<CarData>;

const isCarData = (
  potentialCarData: PartialCarData | CarData,
): potentialCarData is CarData => {
  try {
    carDataValidationSchema.validateSync(potentialCarData);
    return true;
  } catch (error) {
    return false;
  }
};

export const createCar: RequestHandler<
{}, // Parametrai
CarModel | ResponseError, // Atsakymo tipas
PartialCarData, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = (req, res) => {
  const carData = req.body;
  if (!isCarData(carData)) {
    res.status(400).json({ errorMsg: 'Incorrect data' });
    return;
  }

  const newCar: CarModel = { id: '5', ...carData };
  cars.push(newCar);
  res.status(201).json(newCar);
};
