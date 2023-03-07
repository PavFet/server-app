import { AuthSuccessResponse, RegistrationData } from 'auth/types';
import registrationDataValidationSchema from 'auth/validation-schemas/registration-data-validation-schema';
import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';

export const register: RequestHandler<
  {},
  AuthSuccessResponse | ResponseError,
  Partial<RegistrationData>,
  {}
> = async (req, res) => {
  try {
      const registrationData = registrationDataValidationSchema
    .validateSync(req.body, { abortEarly: false });

  res.status(200).json(registrationData as unknown as AuthSuccessResponse);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
