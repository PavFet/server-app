import { AuthSuccessResponse, RegistrationData } from 'auth/types';
import registrationDataValidationSchema from 'auth/validation-schemas/registration-data-validation-schema';
import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import tokenService from 'services/token-service';
import UserModel from '.';

export const register: RequestHandler<
  {},
  AuthSuccessResponse | ResponseError,
  Partial<RegistrationData>,
  {}
> = async (req, res) => {
  try {
      const registrationData = registrationDataValidationSchema
    .validateSync(req.body, { abortEarly: false });

    const user = await UserModel.createUser({
      email: registrationData.email,
      password: registrationData.password,
      name: registrationData.name,
      surname: registrationData.surname,
    });

  const token = tokenService.createToken(user.email, user.role);

  res.status(200).json({
    token,
    user,
  });
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
