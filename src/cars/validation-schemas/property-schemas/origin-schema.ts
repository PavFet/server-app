import * as yup from 'yup';

const originSchema = yup.string()
.min(1, 'origin must have at least 2 symbols')
.max(4, 'origin can\'t have more than 50 symbols');

export default originSchema;
