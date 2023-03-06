import * as yup from 'yup';

const yearSchema = yup.number()
.min(1965, 'Year must be in range 1965-1975')
.max(1975, 'Year must be in range 1965-1975');

export default yearSchema;
