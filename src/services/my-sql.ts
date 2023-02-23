import mysql from 'mysql';
import config from '../config';

export const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const connectMySql = (callback: VoidFunction) => {
  connection.connect((err) => {
    if (err) { throw new Error(err.message); }
    callback();
    connection.end();
});
};
