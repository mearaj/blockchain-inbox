import {RequestHandler} from 'express';
import {AccountModel} from 'models/account';
import {Error} from 'mongoose';
import {LoginRequestBody, LoginToken, TokenRequestBody, TokenResponseBody} from 'models/token';
import {v4 as uuid} from 'uuid';
import {helpers} from 'chains/common/helpers';

export const requestLoginToken: RequestHandler = async (req, res, next) => {
  const {chainName, publicKey} = (req.body as TokenRequestBody);
  const result = await helpers(chainName, publicKey);
  if (!result.isValid) {
    return res.status(400).json({error: {message: result.error}});
  }
  let account = await AccountModel.findOne({publicKey, chainName});
  if (!account) {
    account = new AccountModel(req.body);
  }
  account.chainName = chainName;
  const loginToken: LoginToken = {
    token: uuid(),
    createdAt: Date.now().valueOf(),
  }
  account.loginTokens = [...account.loginTokens, loginToken];
  try {
    await account.save();
    return res.json({token: loginToken.token});
  } catch (e: unknown) {
    console.log(e);
    return res.status(400).json({error: {message: (e as Error)?.message}});
  }
};
