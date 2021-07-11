import {RequestHandler, Router} from 'express';
import {AccountModel} from 'models/account';
import {ERROR_INVALID_PUBLIC_ADDRESS} from 'data/errors';
import {LOGIN_ENDPOINT} from 'config';

export const router = Router();

export const loginController:RequestHandler = async (req, res, next) => {
  const {publicAddress, loginToken, signedToken} = req.body;
  if (!publicAddress || typeof publicAddress!=='string' || publicAddress.trim()==="") {
    return res.status(400).json({
      message: ERROR_INVALID_PUBLIC_ADDRESS
    })
  }
  const user = new AccountModel(publicAddress);
  return res.json({success: true});
};

