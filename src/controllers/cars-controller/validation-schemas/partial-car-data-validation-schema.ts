import * as yup from 'yup';
import { PartialCarData } from '../types';
import yearSchema from './property-schemas/year-schema';
import nameSchema from './property-schemas/name-schema';
import originSchema from './property-schemas/origin-schema';
import imagesSchema from './property-schemas/images-schema';
import {
 cylindersSchema, displacementSchema, horsepowerSchema, milesPerGallonSchema, weightInLbsSchema,
} from './property-schemas/technical-characteristics-schema';

const partialCarDataValidationSchema: yup.ObjectSchema<PartialCarData> = yup.object({
  name: nameSchema,
  year: yearSchema,
  origin: originSchema,
  images: imagesSchema,
  technical_characteristics: yup
    .object({
      acceleration: yup.number()
        .required('acceleration is required')
        .positive('acceleration must be positive')
        .test(
        'isAcceleration',
        'incorrect acceleration format',
        (val) => {
        if (val === undefined) return true;
        return Number(val.toFixed(1)) === val;
        },
    ),
      cylinders: cylindersSchema.required('cylinders is required'),
      displacement: displacementSchema.required('displacement is required'),
      horsepower: horsepowerSchema.required('horsepower is required'),
      miles_per_gallon: milesPerGallonSchema.required('miles per gallon is required'),
      weight_in_lbs: weightInLbsSchema.required('weight in lbs is required'),
    }),
}).strict(true);

export default partialCarDataValidationSchema;
