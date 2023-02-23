import * as yup from 'yup';
import { CarData } from '../types';

export const carDataValidationSchema: yup.ObjectSchema<CarData> = yup.object({
  name: yup.string()
    .required('name is required')
    .min(2, 'name must have at least 2 symbols')
    .max(50, 'name can\'t have more than 50 symbols'),

  year: yup.number()
    .required('year is required')
    .min(1965, 'Year must be in range 1965-1975')
    .max(1975, 'Year must be in range 1965-1975'),

  origin: yup.string()
    .required('origin is required')
    .min(1, 'origin must have at least 2 symbols')
    .max(4, 'origin can\'t have more than 50 symbols'),

  images: yup.array(yup.string().required())
    .required('images are required')
    .min(1, 'images must have at least one image'),

    technical_characteristics: yup
    .object({
      acceleration: yup.number()
        .required('acceleration is required')
        .positive('acceleration must be positive')
        .test(
        'isAcceleration',
        'incorrect acceleration format',
        (val) => Number(val.toFixed(1)) === val,
    ),

        cylinders: yup.number()
        .required('cylinders is required')
        .min(4, 'cylinders must be in range 4-12')
        .max(12, 'cylinders must be in range 4-12'),

        displacement: yup.number()
        .required('displacement is required')
        .min(1, 'displacement must be in range 1-1000')
        .max(1000, 'displacement must be in range 1-1000'),

        horsepower: yup.number()
        .required('horsepower is required')
        .min(1, 'horsepower must be in range 1-1000')
        .max(1000, 'horsepower must be in range 1-1000'),

        miles_per_gallon: yup.number()
        .required('miles per gallon is required')
        .min(1, 'miles per gallon must be in range 1-40')
        .max(40, 'miles per gallon must be in range 1-40'),

        weight_in_lbs: yup.number()
        .required('weight in lbs is required')
        .min(300, 'weight in lbs must be in range 300-8000')
        .max(8000, 'weight in lbs must be in range 300-8000'),

    }),
}).strict(true);
