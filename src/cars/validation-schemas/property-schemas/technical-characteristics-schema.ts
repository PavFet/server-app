import * as yup from 'yup';

export const cylindersSchema = yup.number()
.min(4, 'cylinders must be in range 4-12')
.max(12, 'cylinders must be in range 4-12');

export const displacementSchema = yup.number()
.min(1, 'displacement must be in range 1-1000')
.max(1000, 'displacement must be in range 1-1000');

export const horsepowerSchema = yup.number()
.min(1, 'horsepower must be in range 1-1000')
.max(1000, 'horsepower must be in range 1-1000');

export const milesPerGallonSchema = yup.number()
.min(1, 'miles per gallon must be in range 1-40')
.max(40, 'miles per gallon must be in range 1-40');

export const weightInLbsSchema = yup.number()
.min(300, 'weight in lbs must be in range 300-8000')
.max(8000, 'weight in lbs must be in range 300-8000');
