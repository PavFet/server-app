import express from 'express';
import morgan from 'morgan';
import auth from 'auth';
import carsRouter from './cars';
import config from './config';
import { connectMySql } from './services/my-sql';

const server = express();

// Midlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/cars', carsRouter);
server.use('/api/auth/', auth);

connectMySql(() => {
  server.listen(config.server.port, () => {
    console.log(`server is running on:  http://${config.server.domain}:${config.server.port}`);
  });
});
