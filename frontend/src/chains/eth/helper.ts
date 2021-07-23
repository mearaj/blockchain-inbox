// this function assumes privateKey is validated before call
import {Wallet} from 'ethers';

export const HELPER_MSG_ETH_PUBLIC_KEY = "An Eth Public Key must begin with 0x04 followed by 128 hex characters";


export const signTokenForEthChain = async (privateKey: string, token: string) => {
  try {
    const wallet = new Wallet(privateKey);
    return await wallet.signMessage(token);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const isEthPublicKeyFormatValid = (publicKey: string): { isValid: boolean, error: string } => {
  let error = HELPER_MSG_ETH_PUBLIC_KEY;
  const isValid = /^0x04([A-Fa-f0-9]{128})$/.test(publicKey);
  if (isValid) {
    error = "";
  }
  return {isValid, error};
}
