import {ChainInfo, ChainShortInfo} from 'chains/common/chain-info';
import {evmChains} from 'chains/common/chains';

export enum AllowedChainEnum {
  ETH = "ETH",
  Bluzelle = "Bluzelle"
}


export const ethChains: ChainShortInfo[] = evmChains.filter(
  (chain: ChainInfo) => chain.chain===AllowedChainEnum.ETH)
  .map((chain: ChainInfo) => ({
      name: chain.name,
      chain: chain.chain
    }
  ));

export const bluzelleChain = {
  name: "Bluzelle Mainnet",
  chain: "Bluzelle"
};

export const allowedChains: ChainShortInfo[] = [...ethChains, bluzelleChain];

export {verifyPublicKeyFormat} from './helpers';
