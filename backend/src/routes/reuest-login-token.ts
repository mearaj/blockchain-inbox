import {RequestHandler} from 'express';
import {User} from 'models/user';
import {v4 as uuid} from 'uuid';
import {ERROR_INVALID_PUBLIC_ADDRESS} from 'data/errors';
import {loginTokens} from 'data/login-tokens';

export const registerLoginToken: RequestHandler = (req, res, next) => {
  const {publicAddress} = req.body;
  console.log(publicAddress);
  if (!publicAddress || typeof publicAddress!=='string' || publicAddress.trim()==="") {
    return res.status(400).json({
      message: ERROR_INVALID_PUBLIC_ADDRESS
    })
  }
  const user = new User(publicAddress, uuid());
  loginTokens[user.loginToken] = user;
  return res.json(user);
};
