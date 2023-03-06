import { createCar } from './create-car';
import { deleteCar } from './delete-car';
import { getCar } from './get-car';
import { getCars } from './get-cars';
import { updateCar } from './update-car';

const CarsModel = {
  getCar,
  getCars,

  createCar,
  updateCar,
  deleteCar,
};

export default CarsModel;
