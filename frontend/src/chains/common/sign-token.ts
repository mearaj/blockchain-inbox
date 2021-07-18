import {signTokenForEthChain} from 'chains/eth';
import {signTokenForBlzChain} from 'chains/bluzelle';
import {getChain} from 'chains/common/get-chain';

export const signToken = async (privateKey: string, chainName: string, token: string): Promise<string> => {
  const chain = getChain(chainName);
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
