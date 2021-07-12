import {RequestHandler, Router} from 'express';
import {AccountModel} from 'models/account';
import {JWT_SECRET, LOGIN_TOKEN_THRESHOLD} from 'config';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import * as jwt from 'jsonwebtoken';
import {Buffer} from 'buffer';

export const router = Router();

export const loginController: RequestHandler = async (req, res, next) => {
  const {token, publicKey, chainName, signature} = req.body;
  const account = await AccountModel.findOne({publicKey, chainName});
  if (!account) {
    return res.status(404).send({
      error: {
        message: "Invalid request!"
      }
    });
  }
  const foundToken = account.loginTokens.find((eachToken) => eachToken.token===token);
  if (!foundToken) {
    return res.status(404).send({
      error: {
        message: "Invalid request!"
      }
    });
  }
  const isTokenExpired = Date.now().valueOf() - foundToken.createdAt >= LOGIN_TOKEN_THRESHOLD;
  if (isTokenExpired) {
    return res.status(404).send({
      error: {
        message: "Token expired!"
      }
    });
  }

  try {
    const recovered = sigUtil.recoverPersonalSignature({data: foundToken.token, sig: signature})
    const addressBuff = Buffer.from(publicKey.substr(4), "hex");// 0x04 is excluded
    const address = "0x" + ethUtil.publicToAddress(addressBuff).toString("hex");// 0x is required to prefix public address
    if (ethUtil.toChecksumAddress(recovered)===ethUtil.toChecksumAddress(address)) {
      const token = jwt.sign({id: account.id}, JWT_SECRET);
      account.authTokens = [...account.authTokens, token];
      await account.save();
      return res.json(token);
    } else {
      return res.status(400).json("Invalid Signature");
    }
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
};

