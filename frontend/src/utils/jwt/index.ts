import {decode, JwtPayload} from 'jsonwebtoken';

export const isTokenExpired = (jwtToken: string): boolean => {
  const {exp} = decode(jwtToken) as JwtPayload;
  if (exp) {
    return (Date.now() / 1000) > exp;
  }
  return true;
};
export const isLoggedIn = (jwtToken: string): boolean => {
  return !isTokenExpired(jwtToken);
};
