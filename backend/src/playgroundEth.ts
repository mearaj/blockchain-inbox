import * as bip39 from 'bip39';
import {fromSeed} from 'bip32';
import elliptic from 'elliptic';
import {verifyBluzSignature} from './utils/verifyBluzSignature';
import CryptoJS from 'crypto-js';
import eccrypto from 'eccrypto';
import {initSDK} from './db/bluzelleSdk';

const ethPrivateKey = "140841d941c5089c5af70155d9e0e1d8c749359cc7be87fdb316186936fa0c59";




const playgroundEth = async () => {
  return "terminating...."
};

playgroundEth().then(console.log).catch(console.log);
