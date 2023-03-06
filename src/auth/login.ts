import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import { CredentialPartial, AuthSuccessResponse } from './types';
import credentialsValidationSchema from './validation-schemas/credentials-validation-schema';

export const login: RequestHandler<
{},
AuthSuccessResponse | ResponseError,
CredentialPartial,
{}
> = (req, res) => {
  try {
    const credentials = credentialsValidationSchema.validateSync(req.body, { abortEarly: false });
    res.status(200).json(credentials as unknown as AuthSuccessResponse);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
