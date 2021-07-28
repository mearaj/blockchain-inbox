import elliptic from 'elliptic';
import CryptoJS from 'crypto-js';
import * as bip39 from 'bip39';
import {fromSeed} from 'bip32';

export const HELPER_MSG_BLUZELLE_PUBLIC_KEY = "A Bluzelle Public Key must contain 66 hex characters";

// this function assumes privateKey is validated before call
export const signTokenForBlzChain = (privateKey: string, token: string) => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const key = secp256k1.keyFromPrivate(privateKey);
  const hash = CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(token as any)
  ).toString();

  const signature = key.sign(hash, {
    canonical: true,
  });
  return Buffer.from(new Uint8Array(
    signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32))
  )).toString('hex');
}

export const getPrivateKeysFromBluzelleMnemonic = (
  mnemonic: string,
  //path: string = `m/44'/118'/0'/0/0`,
  path: string = `m/44'/483'/0'/0/0`,
  password: string = ""
): string[] => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, password);
  const masterKey = fromSeed(seed);
  const hd = masterKey.derivePath(path);

  const privateKey = hd.privateKey;
  if (!privateKey) {
    throw new Error("null hd key");
  }
  return [Buffer.from(privateKey).toString("hex")];
}

export const validateBluzelleMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
}

export const isBluzellePublicKeyFormatValid = (publicKey: string): { isValid: boolean, error: string } => {
  let error = HELPER_MSG_BLUZELLE_PUBLIC_KEY;
  const isValid = /^[A-Fa-f0-9]{66}$/.test(publicKey);
  if (isValid) {
    error = "";
  }
  return {isValid, error};
}

