import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

// setup
const server = express();
const { SERVER_PORT, SERVER_DOMAIN } = process.env;

if (SERVER_PORT === undefined || SERVER_DOMAIN === undefined) {
  throw new Error("Please define constants in '.env' file");
}

// Midlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());

// API Router
const cars = [
  { id: 1, title: 'BMW1' },
  { id: 2, title: 'BMW2' },
  { id: 3, title: 'BMW3' },
  { id: 4, title: 'BMW4' },
];
const apiRouter = express.Router();
server.use('/api', apiRouter);

apiRouter.get('/cars', (req, res) => {
  res.status(200).json(cars);
});

apiRouter.post('/cars', (req, res) => {
  const { body } = req;
  const newCar = { id: 5, title: body.title };
  cars.push(newCar);
  res.status(201).json(cars);
});

// Server init
server.listen(SERVER_PORT, () => {
  console.log(`server is running on:  http://${SERVER_DOMAIN}:${SERVER_PORT}`);
});
