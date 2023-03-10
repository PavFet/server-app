import mysql from 'mysql2/promise';
import config from 'config';
import { CarViewModel } from 'cars/types';

export const deleteCar = async (id: string): Promise<void> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
  DELETE FROM images WHERE carId = ?;
  DELETE FROM cars WHERE id = ?;
  `;
  const preparedSqlData = [id, id];
  await mySqlConnection.query<CarViewModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();
};
