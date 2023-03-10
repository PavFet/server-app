import mysql from 'mysql2/promise';
import config from 'config';
import { RegistrationData, UserEntityRow } from 'auth/types';
import BcryptService from 'services/bcrypt-service';
import SQL from './sql';

export const createUser = async (userData: RegistrationData): Promise<UserEntityRow> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
  INSERT INTO users (email, password, name, surname) VALUES 
  (?, ?, ?, ?);

  ${SQL.SELECT}
  WHERE users.id = LAST_INSERT_ID();
    `;
  const preparedSqlData = [
    userData.email,
    BcryptService.hash(userData.password),
    userData.name,
    userData.surname,
  ];

  const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
  const [createdUser] = (queryResultsArr as UserEntityRow[][])[1];
  await mySqlConnection.end();

  return createdUser;
};
