import { RequestHandler } from 'express';
import cars from '../cars-data';

type CarData = Omit<CarModel, 'id'>;
type PartialCarData = PartialRecursive<CarData>;

const isCarData = (
  potentialCarData: PartialCarData | CarData,
): potentialCarData is CarData => {
  const {
    images, name, origin, technical_characteristics, year,
  } = potentialCarData;
  if (typeof name !== 'string') return false;
  if (typeof year !== 'string') return false;
  if (typeof origin !== 'string') return false;
  if (!Array.isArray(images)) return false;
  if (images.some((img) => typeof img !== 'string')) return false;
  if (technical_characteristics === null || typeof technical_characteristics !== 'object') return false;
  if (typeof technical_characteristics.acceleration !== 'number') return false;
  if (typeof technical_characteristics.cylinders !== 'number') return false;
  if (typeof technical_characteristics.displacement !== 'number') return false;
  if (typeof technical_characteristics.horsepower !== 'number') return false;
  if (typeof technical_characteristics.miles_per_gallon !== 'number') return false;
  if (typeof technical_characteristics.weight_in_lbs !== 'number') return false;

  return true;
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
