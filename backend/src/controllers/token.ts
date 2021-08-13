import {RequestHandler} from 'express';
import {Account, AccountModel} from 'models/account';
import {LoginToken, TokenRequestBody} from 'models/token';
import {v4 as uuid} from 'uuid';
import {verifyPublicKeyFormat} from 'chains/common/helpers';
import {AppError} from "../models/error";

export const requestLoginToken: RequestHandler = async (req, res, next) => {
    const {chainName, publicKey} = (req.body as TokenRequestBody);
    const result = await verifyPublicKeyFormat(chainName, publicKey);
    if (!result.isValid) {
        return next(new AppError(result.error, 400));
    }
    let account = await AccountModel.findOne({publicKey, chainName});
    if (!account) {
        const newAccount: Account = {chainName, publicKey, loginTokens: [], authTokens: []}
        account = new AccountModel(newAccount);
    }
    account.chainName = chainName;
    const loginToken: LoginToken = {
        token: uuid(),
        createdAt: Date.now().valueOf(),
    }
    account.loginTokens = [...account.loginTokens, loginToken];
    try {
        await account.save();
        return res.status(201).json({token: loginToken.token});
    } catch (e) {
        console.log(e);
        return next(new AppError());
    }
};

