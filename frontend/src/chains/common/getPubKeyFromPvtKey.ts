import {getChain} from 'chains/common/getChain';
import {Wallet} from 'ethers';
import elliptic from 'elliptic';
import {PublicKeyValidatorResponse} from 'chains/common/interfaces';

export const genPublicKeyFromPrivateKey = (privateKey: string, chainName: string): PublicKeyValidatorResponse => {
  const chainInfo = getChain(chainName);
  if (!chainInfo) {
    return {error: "Chain Info is not provided", isValid: false, publicKey: ""};
  }
  let isValid: boolean = false;
  let error: string = "Invalid Private Key";
  let publicKey: string = "";
  switch (chainInfo.chain) {
    case "ETH":
      try {
        const wallet = new Wallet(privateKey);
        publicKey = wallet.publicKey;
        console.log("Public key is", publicKey);
        error = "";
        isValid = true;
      } catch (e) {
        console.log(e);
        error = "Invalid Private Key";
        isValid = false;
        publicKey = "";
      }
      break;
    case "Bluzelle":
      try {
        const secp256k1 = new elliptic.ec("secp256k1");
        const key = secp256k1.keyFromPrivate(privateKey, 'hex');
        publicKey = key.getPublic().encode('hex', true);
        error = "";
        isValid = true;
      } catch (e) {
        error = "Invalid Private Key";
        isValid = false;
        publicKey = "";
      }
      isValid = true;
      error = "";
      break;
  }
  console.log({error, isValid, publicKey})

  return {error, isValid, publicKey};
}
