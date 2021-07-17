import {ChainInfo, ChainShortInfo} from 'chains/chain-info';
import {evmChains} from 'chains/chains';

// Refers to the chain property of ChainInfo
export enum AllowedChainEnum {
  ETH = "ETH",
  BLUZELLE = "Bluzelle"
}


// export const ethChains: ChainShortInfo[] = evmChains.filter(
//   (chain: ChainInfo) => chain.chain === AllowedChainEnum.ETH)
//   .map((chain) => ({
//       name: chain.name,
//       chain: chain.chain
//     }
//   ));

export const bluzelleChain:ChainInfo = {
  name: "Bluzelle Mainnet",
  chain: AllowedChainEnum.BLUZELLE,
  chainId: 0,
  faucets: [],
  infoURL: '',
  nativeCurrency: {
    name: "Bluzelle",
    symbol: "BLZ",
    decimals: 6
  },
  network: '',
  networkId: 0,
  rpc: [],
  shortName: ''
};

export const isChainSupported = (chain:string) => Object.values(AllowedChainEnum).includes(chain as AllowedChainEnum);

// export const allowedChains:ChainShortInfo[] = [...ethChains, bluzelleChain];

export const allChains:ChainInfo[] = [...evmChains, bluzelleChain].sort((a,b)=> {
  if (!isChainSupported(b.chain)) {
    return -1;
  }
  return 0;
});

