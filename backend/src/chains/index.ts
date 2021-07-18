import {ChainInfo, ChainShortInfo} from './chain-info';
import {evmChains} from './chains';

export enum AllowedChainEnum {
  ETH = "ETH",
  Bluzelle = "Bluzelle"
}


export const ethChains: ChainShortInfo[] = evmChains.filter(
  (chain: ChainInfo) => chain.chain === AllowedChainEnum.ETH)
  .map((chain: ChainInfo) => ({
      name: chain.name,
      chain: chain.chain
    }
  ));

export const bluzelleChain = {
  name: "Bluzelle Mainnet",
  chain: "Bluzelle"
};

export const allowedChains:ChainShortInfo[] = [...ethChains, bluzelleChain];
