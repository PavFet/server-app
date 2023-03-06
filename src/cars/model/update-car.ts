import mysql from 'mysql2/promise';
import config from 'config';
import { colonObjectQueryFormat } from 'services/my-sql';
import SQL from './sql';

type PrepareSqlResult = [string, Record<string, string>];

type PrepareSql = (carData: PartialCarData) => PrepareSqlResult;

const prepareImagesSql: PrepareSql = (carData) => {
  const bindingsOrNull = carData.images?.reduce((prevBindings, img, i) => ({
    ...prevBindings,
    [`img${i + 1}`]: img,
  }), {} as Record<string, string>) ?? null;
  const shouldInsert = bindingsOrNull !== null;
  const shouldInsertImages = carData.images !== undefined && carData.images.length > 0;

  const sql = shouldInsert
    ? `
      DELETE FROM images 
      WHERE images.carId = :id;
    
      ${shouldInsertImages ? `INSERT INTO images (src, carId) VALUES
        ${Object.keys(bindingsOrNull).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
      : ''}
    ` : '';

  const bindings = bindingsOrNull ?? {};

  return [sql, bindings];
};

const prepareTechnicalCharacteristicsSql: PrepareSql = (carData) => {
  const sql = carData.technical_characteristics !== undefined ? `
    INSERT INTO technicalCharacteristics (miles_per_gallon, cylinders, displacement, horsepower, weight_in_lbs, acceleration) VALUES
    (:miles_per_gallon, :cylinders, :displacement, :horsepower, :weight_in_lbs, :acceleratio);` : '';
  const bindings = carData.technical_characteristics ?? {};

  return [sql, bindings];
};

const prepareCarSql: PrepareSql = (carData) => {
  const propsSql = [
    carData.name !== undefined ? 'name = :name' : null,
    carData.origin !== undefined ? 'origin = :origin' : null,
    carData.year !== undefined ? 'year = :year' : null,
    carData.technical_characteristics !== undefined ? 'technicalCharacteristicsId = LAST_INSERT_ID()' : null,
  ].filter((setPropSql) => setPropSql !== null).join(',\n');

  const sql = propsSql.length > 0 ? `
    UPDATE cars SET
    ${propsSql}
    WHERE cars.id = :id;
    ` : '';

  const bindings: Record<string, string> = {};
  if (carData.name !== undefined) bindings.name = carData.name;
  if (carData.origin !== undefined) bindings.origin = carData.origin;
  if (carData.year !== undefined) bindings.year = String(carData.year);
  console.log(sql);
  console.log(bindings);
  return [sql, bindings];
};

export const updateCar = async (
  id: string,
  carData: PartialCarData,
): Promise<CarViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  mySqlConnection.config.queryFormat = colonObjectQueryFormat;

  const [imagesSql, imagesBindings] = prepareImagesSql(carData);
  const [
    technicalCharacteristicsSql,
    technicalCharacteristicsBindings,
  ] = prepareTechnicalCharacteristicsSql(carData);
  const [carSql, carBindings] = prepareCarSql(carData);

  const preparedSql = `
    ${imagesSql}
    ${technicalCharacteristicsSql}
    ${carSql}
    ${SQL.SELECT}
    WHERE c.id = :id
    ${SQL.GROUP};
  `.trim();

  const bindings = {
    id,
    ...imagesBindings,
    ...technicalCharacteristicsBindings,
    ...carBindings,
  };
  console.log(preparedSql);
  console.log(bindings);
  const [queryResultsArr] = await mySqlConnection.query<CarViewModel[]>(preparedSql, bindings);
  const updatedHouse = queryResultsArr.at(-1) as CarViewModel;

  await mySqlConnection.end();

  return updatedHouse;
};
