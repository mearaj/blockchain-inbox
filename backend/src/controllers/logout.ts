import {RequestHandler} from 'express';
import {Account} from 'models/account';
import {Document} from 'mongoose';


// @Request: Get
// Note: This controller assumes authGuard is called before it.
export const logoutController:RequestHandler = async (req,res,next) => {
  const account: (Account & Document<any, any, Account>)= (req as any).account;
  const token:string = (req as any).authToken;
  const indexOfToken = account.authTokens.indexOf(token);
  if (indexOfToken >= 0) {
    account.authTokens.splice(indexOfToken, 1);
    await account.save();
  }
  return res.status(200).send();
};


