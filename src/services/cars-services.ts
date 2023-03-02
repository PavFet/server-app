import mysql from 'mysql2/promise';
import config from '../config';
import { CarData } from '../controllers/cars-controller/types';

type CreateCarQueryResult = [
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  CarModel[],
];

const CARS_QUERY_SQL_SELECT = `
SELECT 
  c.id, 
  c.name, 
  JSON_OBJECT(
    'miles_per_gallon', th.miles_per_gallon,
    'cylinders', th.cylinders,
    'displacement', th.displacement,
    'horsepower', th.horsepower, 
    'weight_in_lbs', th.weight_in_lbs,
    'acceleration', th.acceleration) as technicalCharacteristics, 
  c.year, 
  c.origin, 
  IF(COUNT(i.id) = 0, JSON_ARRAY(), json_arrayagg(i.src)) as images
FROM cars as c
LEFT JOIN images as i
ON i.carId = c.id
LEFT JOIN  technicalCharacteristics as th
ON c.technicalCharacteristicsId = th.id`;
const CARS_QUERY_SQL_GROUP = 'GROUP BY c.id;';
const CARS_QUERY_SQL_WHERE_ID = 'WHERE c.id = ?;';

const getCars = async (): Promise<CarModel[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const sql = [CARS_QUERY_SQL_SELECT, CARS_QUERY_SQL_GROUP].join('\n');
  const [cars] = await mySqlConnection.query<CarModel[]>(sql);

  mySqlConnection.end();

  return cars;
};

const getCar = async (id: string): Promise<CarModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = [CARS_QUERY_SQL_SELECT, CARS_QUERY_SQL_WHERE_ID, CARS_QUERY_SQL_GROUP].join('\n');
  const preparedSqlData = [id];
  const [cars] = await mySqlConnection.query<CarModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();

  if (cars.length === 0) {
    throw new Error(`car with id <${id}> was not found`);
  }

  return cars[0];
};

const createCar = async (carData: CarData): Promise<CarModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
  INSERT INTO technicalCharacteristics (miles_per_gallon, cylinders, displacement, horsepower, weight_in_lbs, acceleration) VALUES 
    (?, ?, ?, ?, ?, ?);
    
    INSERT INTO cars (name, year, origin, technicalCharacteristicsId) VALUES
    (?, ?, ?, LAST_INSERT_ID());

    SET @carId = LAST_INSERT_ID();
    
    INSERT INTO images (src, carId) VALUES
    ${carData.images.map(() => '(?, @carId)').join(',\n')};

    ${CARS_QUERY_SQL_SELECT}
    WHERE c.id = @carId
    ${CARS_QUERY_SQL_GROUP};
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
    ...carData.images,
  ];

  const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
  const [createdCar] = (queryResultsArr as CreateCarQueryResult)[4];

  await mySqlConnection.end();

  return createdCar;
};

  const CarService = {
    getCar,
    getCars,
    createCar,
  };

  export default CarService;
