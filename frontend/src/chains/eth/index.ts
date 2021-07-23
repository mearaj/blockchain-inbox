import {AllowedChainEnum, ChainInfo, ChainShortInfo} from 'chains/common/chainInfo';
import {evmChains} from 'chains/data/chains';

export const ethChains: ChainShortInfo[] = evmChains.filter(
  (chain: ChainInfo) => chain.chain===AllowedChainEnum.ETH)
  .map((chain) => ({
      name: chain.name,
      chain: chain.chain
    }
  ));


//export {signTokenForEthChain}

export {signTokenForEthChain} from 'chains/eth/helper';
