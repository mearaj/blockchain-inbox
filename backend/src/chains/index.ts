// Ref https://github.com/ethereum-lists/chains and
// Ref https://chainid.network/chains.json
// Ref https://github.com/taylorjdawson/eth-chains/blob/main/src/types.ts

export interface Chain {
  name: string;
  chain: string;
}

import {getAllChains, IChainData} from 'evm-chains';

export const ethChains: Chain[] = getAllChains().filter(
  (chain: IChainData) => chain.chain.toLowerCase() === "eth")
  .map((chain) => ({
      name: chain.name,
      chain: chain.chain
    }
  ));

export const allowedChainNames:Chain[] = [...ethChains, {
  name: "Bluzelle Mainnet",
  chain: "Bluzelle"
}];

export const getChainIfSupported = (chainName:string): Chain | undefined => {
  return allowedChainNames.find((eachChain)=> eachChain.name === chainName);
}


export default allowedChainNames;
