import {decode, JwtPayload} from 'jsonwebtoken';
import {isTokenExpired} from 'utils/jwt/isTokenExpired';

export const isLoggedIn = (jwtToken:string): boolean => {
  return !isTokenExpired(jwtToken);
};

