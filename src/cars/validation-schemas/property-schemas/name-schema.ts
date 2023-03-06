import * as yup from 'yup';

const nameSchema = yup.string()
.min(2, 'name must have at least 2 symbols')
.max(50, 'name can\'t have more than 50 symbols');

export default nameSchema;
