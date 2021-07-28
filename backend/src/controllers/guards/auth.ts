import {RequestHandler} from 'express';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from 'config';
import {AccountModel} from 'models/account';
import {isTokenExpired} from 'utils/jwt';

export const authGuard: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    if (!authHeader || (authHeader && authHeader.trim().length===0)) {
      return res.status(401).json({
        error: {
          message: "Not authorized!"
        }
      })
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const account = await AccountModel.findOne({_id: decoded.id, 'authTokens': token});
    if (!account) {
      return res.status(401).json({
        error: {
          message: "Not authorized!"
        }
      })
    }
    if (isTokenExpired(token)) {
      const indexOfToken = account.authTokens.indexOf(token);
      if (indexOfToken >= 0) {
        account.authTokens.splice(indexOfToken, 1);
        await account.save();
      }
      return res.status(401).json({
        error: {
          message: "Not authorized!"
        }
      });
    }
    (req as any).authToken = token;
    (req as any).account = account;
    next();
  } catch (e) {
    return res.status(401).json({
      error: {
        message: "Not authorized!"
      }
    });
  }
};

