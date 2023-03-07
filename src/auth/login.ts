import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import bcrypt from 'bcrypt';
import tokenService from 'services/token-service';
import UserModel from './model';
import { CredentialPartial, AuthSuccessResponse, UserViewModel } from './types';
import credentialsValidationSchema from './validation-schemas/credentials-validation-schema';

export const login: RequestHandler<
{},
AuthSuccessResponse | ResponseError,
CredentialPartial,
{}
> = async (req, res) => {
  try {
    const credentials = credentialsValidationSchema.validateSync(req.body, { abortEarly: false });
    const user = await UserModel.getUser(credentials.email);
    const validPassword = await bcrypt.compare(credentials.password, user.password);

    if (!validPassword) throw new Error('Incorrect password');
    const token = tokenService.createToken(user.email, user.role);

    const userViewModel: UserViewModel = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };

    res.status(200).json({
      token,
      user: userViewModel,
    });
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
