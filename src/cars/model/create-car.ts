import mysql from 'mysql2/promise';
import config from 'config';
import { CarData, CarViewModel } from 'cars/types';
import SQL from './sql';

type CreateCarQueryResult = [
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  CarViewModel[],
];

export const createCar = async (carData: CarData): Promise<CarViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
  INSERT INTO technicalCharacteristics (miles_per_gallon, cylinders, displacement, horsepower, weight_in_lbs, acceleration) VALUES 
  (?, ?, ?, ?, ?, ?);
    
    INSERT INTO cars (name, year, origin, ownerId, technicalCharacteristicsId) VALUES
    (?, ?, ?, ?, LAST_INSERT_ID());

    SET @carId = LAST_INSERT_ID();
    
    INSERT INTO images (src, carId) VALUES
    ${carData.images.map(() => '(?, @carId)').join(',\n')};
    
    ${SQL.SELECT}
    WHERE c.id = @carId
    ${SQL.GROUP};
    `;
  const preparedSqlData = [
    carData.technical_characteristics.miles_per_gallon,
    carData.technical_characteristics.cylinders,
    carData.technical_characteristics.displacement,
    carData.technical_characteristics.horsepower,
    carData.technical_characteristics.weight_in_lbs,
    carData.technical_characteristics.acceleration,
    carData.name,
    carData.year,
    carData.origin,
    carData.ownerId,
    ...carData.images,
  ];

  const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
  console.log(carData.ownerId);
  const [createdCar] = (queryResultsArr as CreateCarQueryResult)[4];

  await mySqlConnection.end();

  return createdCar;
};
