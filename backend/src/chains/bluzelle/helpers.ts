import elliptic from 'elliptic';
import CryptoJS from 'crypto-js';

export const verifyBluzSignature = (msg: string, publicKey: string, signature: string | Uint8Array): boolean => {
  const hash = Buffer.from(CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(msg as any)
  ).toString(), 'hex');
  let isValid = false;
  const secp256k1 = new elliptic.ec("secp256k1");
  const key = secp256k1.keyFromPublic(publicKey, 'hex');
  let r;
  let s;
  if (typeof signature === 'string') {
    // const strToArray  = new Uint8Array(Buffer.from(signature,'hex'));
    // r = strToArray.slice(0,32);
    // s = strToArray.slice(32, 64);
    r = new Uint8Array(Buffer.from(signature.substring(0, 64),'hex'));
    s = new Uint8Array(Buffer.from(signature.substring(64, 128),'hex'));
  } else {
    r = signature.slice(0,32);
    s = signature.slice(32, 64);
  }
  isValid = key.verify(hash, {r,s});
  return isValid;
}
