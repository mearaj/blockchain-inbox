import {RequestHandler} from 'express';
import {AccountModel} from 'models/account';
import {JWT_SECRET, LOGIN_TOKEN_THRESHOLD} from 'config';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import * as jwt from 'jsonwebtoken';
import {verifyBluzSignature} from 'chains/bluzelle/helpers';
import {LoginRequestBody} from 'models/token';
import {allowedChains} from 'chains/common';
import {AppError} from "../models/error";
import {asyncCatchHandler} from "./error";

// @Request: Post
export const loginController: RequestHandler = asyncCatchHandler(async (req, res, next) => {
    const {token, publicKey, chainName, signature} = (req.body as LoginRequestBody);
    if (!token || !publicKey || !chainName || !signature) {
        return next(new AppError("Bad Request", 400));
    }
    const account = await AccountModel.findOne({publicKey, chainName});
    if (!account) {
        return next(new AppError("Account Not Found!", 400));
    }
    const foundToken = account.loginTokens.find((eachToken) => eachToken.token === token);
    if (!foundToken) {
        return next(new AppError("Token Not Found!", 400));
    }
    const isLoginTokenExpired = Date.now().valueOf() - foundToken.createdAt >= LOGIN_TOKEN_THRESHOLD;
    if (isLoginTokenExpired) {
        return next(new AppError("Token Expired!", 400));
    }
    const chain = allowedChains.find((chain) => chain.name === chainName);
    if (!chain) {
        return next(new AppError("Chain Not Supported!", 400));
    }
    let isValid = false;
    switch (chain.chain.toLowerCase()) {
        case "eth":
            try {
                const recovered = sigUtil.recoverPersonalSignature({data: foundToken.token, sig: signature})
                const addressBuff = Buffer.from(publicKey.substr(4), "hex");// 0x04 is excluded
                const address = "0x" + ethUtil.publicToAddress(addressBuff).toString("hex");// 0x is required to prefix public address
                isValid = ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(address)
            } catch (e) {
                return next(new AppError(`Currently ${chainName} is not supported!`, 404));
            }
            break;
        case 'bluzelle':
            try {
                isValid = verifyBluzSignature(foundToken.token, publicKey, signature)
            } catch (e) {
                return next(new AppError());
            }
    }
    if (isValid) {
        const token = jwt.sign({id: account.id}, JWT_SECRET, {
            expiresIn: "1 day"
        });
        account.authTokens = [...account.authTokens, token];
        await account.save();
        return res.json({auth: token});
    } else {
        return next(new AppError('"Invalid Signature!', 400));
    }
});

// Note: This controller assumes authGuard is called before it.
export const isLoggedInController: RequestHandler = async (req, res, next) => {
    return res.status(200).send();
}
