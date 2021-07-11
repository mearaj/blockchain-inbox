import {RequestHandler, Router} from 'express';
import {AccountModel} from 'models/account';
import {Error} from 'mongoose';

const router = Router();

export const requestLoginToken:RequestHandler = async (req, res, next) => {
  const account = new AccountModel(req.body);
  try {
    const result = await account.save();
    console.log(result);
    return res.json(result);
  } catch (e: unknown) {
    console.log((e as Error).message);
    return res.status(400).json({
        error: {
          message: "Please enter a valid request, example {publicKey: string; blockchainName: string;}"
        }
      }
    );
  }
};
