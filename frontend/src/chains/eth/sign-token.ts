// this function assumes privateKey is validated before call
import {Wallet} from 'ethers';

export const signTokenForEthChain = async (privateKey: string, token: string) => {
  try {
    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(token);
    console.log(signature);
    return signature;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
