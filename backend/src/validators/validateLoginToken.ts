import {allowedChains} from '../chains';
import {ChainShortInfo} from 'chains/chain-info';

export const validateLoginToken = async (chainName: string, publicKey: string): Promise<{ isValid: boolean, error: string }> => {
  const chainDetail = await allowedChains.find((eachChain:ChainShortInfo) => eachChain.name===chainName);
  let isValid: boolean = false;
  let error = "Chain not supported!";
  if (chainDetail) {
    switch (chainDetail.chain.toLowerCase()) {
      case "eth":
        isValid = /^0x04([A-Fa-f0-9]{128})$/.test(publicKey);
        console.log(publicKey.length);
        if (!isValid) {
          error = "Invalid public key!"
          break;
        }

        isValid = true;
        error = "";
        break;
      case "bluzelle":
        isValid = /^[A-Fa-f0-9]{66}$/.test(publicKey);
        if (!isValid) {
          error = "Invalid public key!"
          break;
        }
        isValid = true;
        error = "";
        break;
    }
  }
  return {isValid, error};
}
