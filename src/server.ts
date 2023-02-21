import express from 'express';
import morgan from 'morgan';
import config from './config';
import carsRouter from './routers/cars-router';

const server = express();

// Midlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/cars', carsRouter);

// Server init
server.listen(config.server.port, () => {
  console.log(`server is running on:  http://${config.server.domain}:${config.server.port}`);
});
