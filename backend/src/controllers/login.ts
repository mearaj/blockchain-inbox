import {RequestHandler, Router} from 'express';
import {AccountModel} from 'models/account';
import {JWT_SECRET, LOGIN_TOKEN_THRESHOLD} from 'config';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {Buffer} from 'buffer';
import * as jwt from 'jsonwebtoken';
import {verifyBluzSignature} from 'utils/verifyBluzSignature';
import {LoginRequestBody} from 'models/token';
import {allowedChains} from 'chains';

// @Request: Post
export const loginController: RequestHandler = async (req, res, next) => {
  const {token, publicKey, chainName, signature} = (req.body as LoginRequestBody);
  if (!token || !publicKey || !chainName || !signature) {
    return res.status(404).send({
      error: {
        message: "Invalid credentials!"
      }
    });
  }
  const account = await AccountModel.findOne({publicKey, chainName});
  if (!account) {
    return res.status(404).send({
      error: {
        message: "Invalid credentials!"
      }
    });
  }
  const foundToken = account.loginTokens.find((eachToken) => eachToken.token===token);
  if (!foundToken) {
    return res.status(404).send({
      error: {
        message: "Invalid credentials!"
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
  const chain = allowedChains.find((chain)=> chain.name === chainName);
  if (!chain) {
    return res.status(404).send({
      error: {
        message: `Currently ${chainName} is not supported!`
      }
    });
  }
  let isValid = false;
  switch (chain.chain.toLowerCase()) {
    case "eth":
      try {
        const recovered = sigUtil.recoverPersonalSignature({data: foundToken.token, sig: signature})
        const addressBuff = Buffer.from(publicKey.substr(4), "hex");// 0x04 is excluded
        const address = "0x" + ethUtil.publicToAddress(addressBuff).toString("hex");// 0x is required to prefix public address
        isValid = ethUtil.toChecksumAddress(recovered)===ethUtil.toChecksumAddress(address)
      } catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
      }
      break;
    case 'bluzelle':
      try {
        isValid = verifyBluzSignature(foundToken.token, publicKey, signature)
      } catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
      }
  }
  if (isValid) {
    const token = jwt.sign({id: account.id}, JWT_SECRET, {
      expiresIn: "1 day"
    });
    account.authTokens = [...account.authTokens, token];
    await account.save();
    return res.json({auth:token});
  } else {
    return res.status(400).json("Invalid Signature!");
  }
};


// @Request: Get
// Note: This controller assumes authGuard is called before it.
export const isLoggedInController: RequestHandler = async (req, res, next) => {
  return res.status(200).send();
}
