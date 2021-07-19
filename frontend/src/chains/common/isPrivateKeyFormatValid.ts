import {getChain} from 'chains/common/getChain';

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
