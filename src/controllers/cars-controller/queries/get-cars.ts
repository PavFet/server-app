import { RequestHandler } from 'express';
import mysql from 'mysql2/promise';
import config from '../../../config';

export const getCars: RequestHandler<
{}, // Parametrai
CarModel[], // Atsakymo tipas
{}, // Body - gaunami duomenys
{} // QueryParams - duomenis siunciant GET uzklausas, pvz: ?min-18max=18
> = async (req, res) => {
  const mySqlConnection = await mysql.createConnection(config.db);
  const [cars] = await mySqlConnection.query<CarModel[]>(`
  SELECT c.id, c.name, JSON_OBJECT(
    'miles_per_gallon', th.miles_per_gallon,
    'cylinders', th.cylinders,
    'displacement', th.displacement,
    'horsepower', th.horsepower, 
    'weight_in_lbs', th.weight_in_lbs,
    'acceleration', th.acceleration) as technicalCharacteristics, c.year, c.origin, json_arrayagg(i.src) as images
  FROM images as i
  LEFT JOIN cars as c
  ON i.carId = c.id
  LEFT JOIN  technicalCharacteristics as th
  ON c.technicalCharacteristicsId = th.id
  GROUP BY c.id;
  `);
  await mySqlConnection.end();

  res.status(200).json(cars);
};
