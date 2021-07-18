import {AllowedChainEnum, ChainInfo, ChainShortInfo} from 'chains/chain-info';
import {evmChains} from 'chains/data/chains';
import {bluzelleChain} from 'chains/bluzelle';



export const isChainSupported = (chain:string) => Object.values(AllowedChainEnum).includes(chain as AllowedChainEnum);

// export const allowedChains:ChainShortInfo[] = [...ethChains, bluzelleChain];

export const allChains:ChainInfo[] = [...evmChains, bluzelleChain].sort((a,b)=> {
  if (!isChainSupported(b.chain)) {
    return -1;
  }
  return 0;
});


export * from './eth';
