import config from 'config';
import jwt from 'jsonwebtoken';

const createToken = (email: string, role: string) => jwt
  .sign({ email, role }, config.secret.jwtTokenKey);

const tokenService = {
  createToken,
};

export default tokenService;
