import mysql from 'mysql2/promise';
import config from 'config';
import { CarViewModel } from 'cars/types';
import SQL from './sql';

export const getCar = async (id: string): Promise<CarViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
    ${SQL.SELECT}
    WHERE c.id = ?
    ${SQL.GROUP};
  `;
  const preparedSqlData = [id];
  const [cars] = await mySqlConnection.query<CarViewModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();

  if (cars.length === 0) {
    throw new Error(`car with id <${id}> was not found`);
  }

  return cars[0];
};
