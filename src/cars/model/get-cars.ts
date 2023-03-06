import mysql from 'mysql2/promise';
import config from 'config';
import SQL from './sql';

export const getCars = async (): Promise<CarViewModel[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const sql = `
  ${SQL.SELECT}
  ${SQL.GROUP};
`;
  const [cars] = await mySqlConnection.query<CarViewModel[]>(sql);

  mySqlConnection.end();

  return cars;
};
