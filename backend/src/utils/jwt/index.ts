import {decode, JwtPayload} from 'jsonwebtoken';

export const isTokenExpired = (jwtToken: string): boolean => {
  const payload = decode(jwtToken) as JwtPayload;
  if (payload && payload.exp) {
    return (Date.now() / 1000) > payload.exp;
  }
  return true;
};

