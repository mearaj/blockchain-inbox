import {ChainInfo, ChainShortInfo} from 'chains/common/chainInfo';
import {evmChains} from 'chains/data/chains';
import {AllowedChainEnum} from 'chains/common/chainInfo';

export const ethChains: ChainShortInfo[] = evmChains.filter(
  (chain: ChainInfo) => chain.chain === AllowedChainEnum.ETH)
  .map((chain) => ({
      name: chain.name,
      chain: chain.chain
    }
  ));


//export {signTokenForEthChain}

export {signTokenForEthChain} from 'chains/eth/helper';
