import * as yup from 'yup';
import yearSchema from './property-schemas/year-schema';
import nameSchema from './property-schemas/name-schema';
import originSchema from './property-schemas/origin-schema';
import imagesSchema from './property-schemas/images-schema';
import {
  cylindersSchema, displacementSchema, horsepowerSchema, milesPerGallonSchema, weightInLbsSchema,
 } from './property-schemas/technical-characteristics-schema';

export const carDataValidationSchema: yup.ObjectSchema<CarData> = yup.object({
  name: nameSchema.required('name is required'),
  year: yearSchema.required('year is required'),
  origin: originSchema.required('origin is required'),
  images: imagesSchema.required('images are required'),
  technical_characteristics: yup.object({
      acceleration: yup.number()
        .required('acceleration is required')
        .positive('acceleration must be positive')
        .test(
        'isAcceleration',
        'incorrect acceleration format',
        (val) => Number(val.toFixed(1)) === val,
    ),
      cylinders: cylindersSchema.required('cylinders is required'),
      displacement: displacementSchema.required('displacement is required'),
      horsepower: horsepowerSchema.required('horsepower is required'),
      miles_per_gallon: milesPerGallonSchema.required('miles per gallon is required'),
      weight_in_lbs: weightInLbsSchema.required('weight in lbs is required'),

    }),
}).strict(true);
