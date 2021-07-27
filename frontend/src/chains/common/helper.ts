import {Wallet} from 'ethers';
import elliptic from 'elliptic';
import EthCrypto from 'eth-crypto';
import {AllowedChainEnum, ChainInfo} from 'chains/common/chainInfo';
import {signTokenForEthChain} from 'chains/eth';
import {bluzelleChain, signTokenForBlzChain} from 'chains/bluzelle';
import {evmChains} from 'chains/data/chains';
import {isEthPublicKeyFormatValid} from 'chains/eth/helper';
import {isBluzellePublicKeyFormatValid} from 'chains/bluzelle/helper';
import * as ethUtil from 'ethereumjs-util';
import eccrypto from 'eccrypto';


export interface ValidatorResponse {
  isValid: boolean;
  error: string;
}

export interface PublicKeyValidatorResponse extends ValidatorResponse {
  publicKey: string;
}

export const isChainSupported = (chain: string) => Object.values(AllowedChainEnum).includes(chain as AllowedChainEnum);

export const allChains: ChainInfo[] = [...evmChains, bluzelleChain].sort((a, b) => {
  if (!isChainSupported(b.chain)) {
    return -1;
  }
  return 0;
});

export const getChainByName = (chainName: string) => allChains.find((chain) => chain.name===chainName);

export const genPublicKeyFromPrivateKey = (privateKey: string, chainName: string): PublicKeyValidatorResponse => {
  const chainInfo = getChainByName(chainName);
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
  const chainInfo = getChainByName(chainName);
  if (!chainInfo) {
    return {error: "Chain Info is not provided", isValid: false};
  }
  if (!isValidHex(privateKey)) {
    return {error: "Invalid Private Key", isValid: false}
  }
  let isValid: boolean = false;
  let error: string = "Invalid Private Key";
  switch (chainInfo.chain) {
    case AllowedChainEnum.ETH:
    case AllowedChainEnum.Bluzelle:
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
export const isPublicKeyFormatValid = (chainName: string, publicKey: string): { isValid: boolean, error: string } => {
  const chainDetail = getChainByName(chainName);
  let isValid: boolean = false;
  let error = "Chain not supported!";
  if (chainDetail) {
    switch (chainDetail.chain) {
      case AllowedChainEnum.ETH:
        return isEthPublicKeyFormatValid(publicKey);
      case AllowedChainEnum.Bluzelle:
        return isBluzellePublicKeyFormatValid(publicKey);
    }
  }
  return {isValid, error};
}
export const isValidHex = (hexString: string) => {
  return /^([A-Fa-f0-9]+)$/.test(hexString);
}
export const signToken = async (privateKey: string, chainName: string, token: string): Promise<string> => {
  const chain = getChainByName(chainName);
  let signature: string = "";
  if (chain) {
    try {
      switch (chain?.chain) {
        case "ETH":
          signature = await signTokenForEthChain(privateKey, token);
          break;
        case "Bluzelle":
          signature = signTokenForBlzChain(privateKey, token);
          break;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  } else {
    throw Error("Chain currently not supported!");
  }
  return signature;
};


export const getEncryptedMessageFromPublicKey = async (publicKey: string, chainName: string, message: string):
  Promise<{ error: string, isValid: boolean, encryptedMessage: string }> => {
  const chainInfo = getChainByName(chainName);
  if (!chainInfo) {
    return {error: "Chain not supported!", isValid: false, encryptedMessage: ""};
  }
  let isValid: boolean = false;
  let error: string = "Invalid Public Key";
  let encryptedMessage = "";
  switch (chainInfo.chain) {
    case "ETH":
    case "Bluzelle":
      if (chainInfo.chain === "ETH") {
        publicKey = publicKey.substr(2);
      }
      try {
        const encrypted = await EthCrypto.encryptWithPublicKey(
          publicKey,
          JSON.stringify(message)
        );
        encryptedMessage = EthCrypto.cipher.stringify(encrypted);
        isValid = true;
        error = "";
      } catch (e) {
        isValid = false;
        error = e.message || "Unknown error!";
        encryptedMessage = "";
      }
      break;
  }
  return {error, isValid, encryptedMessage};
}


export const getDecryptedMessageFromPrivateKey = async (privateKey: string, chainName: string, message: string):
  Promise<{ error: string, isValid: boolean, decryptedMessage: string }> => {
  const chainInfo = getChainByName(chainName);
  if (!chainInfo) {
    return {error: "Chain not supported!", isValid: false, decryptedMessage: ""};
  }
  let isValid: boolean = false;
  let error: string = "Invalid Private Key";
  let decryptedMessage = "";
  switch (chainInfo.chain) {
    case "ETH":
    case "Bluzelle":
      try {
        const encryptedObject = EthCrypto.cipher.parse(message);
        const decrypted = await EthCrypto.decryptWithPrivateKey(
          privateKey,
          encryptedObject,
        );
        decryptedMessage = JSON.parse(decrypted);
        isValid = true;
        error = "";
      } catch (e) {
        isValid = false;
        error = e.message || "Unknown error!";
        decryptedMessage = "";
      }
      break;
  }
  return {error, isValid, decryptedMessage: decryptedMessage};
}
