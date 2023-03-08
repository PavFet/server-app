import config from 'config';
import jwt from 'jsonwebtoken';

const createToken = (data: AuthData) => jwt
  .sign(data, config.secret.jwtTokenKey);

const decodeToken = (token: string) => jwt.decode(token) as (DecodedAuthData | null);

const TokenService = {
  createToken,
  decodeToken,
};

export default TokenService;
