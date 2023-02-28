import mysql from 'mysql2';
import config from '../config';

export const MySql = mysql.createConnection(config.db);

export const connectMySql = (callback: VoidFunction) => {
  MySql.connect((err) => {
    if (err) { throw new Error(err.message); }

    callback();
    MySql.end();
});
};
