import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import UserModel from './model';

import { createAuthSuccessResponse } from './model/helpers/create-auth-success-response';
import { AuthSuccessResponse } from './types';

export const auth: RequestHandler<
{},
AuthSuccessResponse | ResponseError,
{},
{}
> = async (req, res) => {
  try {
    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

    const authSuccessResponse = createAuthSuccessResponse(user);

    res.status(200).json(authSuccessResponse);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
