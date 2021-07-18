// This method assumes the format of private key is valid hex
import {Wallet} from 'ethers';
import elliptic from 'elliptic';
import {allChains} from 'chains/index';
import {ValidatorResponse} from 'chains/validator';

const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);

export const isValidHex = (hexString: string) => {
  return /^([A-Fa-f0-9]+)$/.test(hexString);
}

export interface PublicKeyValidatorResponse extends ValidatorResponse {
  publicKey: string;
}

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

export const isPrivateKeyFormatValid = (privateKey: string, chainName: string): { error: string, isValid: boolean } => {
  const chainInfo = getChain(chainName);
  if (!chainInfo) {
    return {error: "Chain Info is not provided", isValid: false};
  }
  let isValid: boolean = false;
  let error: string = "Invalid Private Key";
  switch (chainInfo.chain) {
    case "ETH":
      isValid = /^[A-Fa-f0-9]{64}$/.test(privateKey);
      if (!isValid) {
        error = "Invalid Private Key!"
        break;
      }
      isValid = true;
      error = "";
      break;
    case "Bluzelle":
      isValid = /^[A-Fa-f0-9]{64}$/.test(privateKey);
      if (!isValid) {
        error = "Invalid Private Key!"
        break;
      }
      isValid = true;
      error = "";
      break;
  }
  return {error, isValid};
}
