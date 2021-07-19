// Sorting chain in order such that supported chain appears first
import {ChainInfo} from 'chains/common/chainInfo';
import {evmChains} from 'chains/data/chains';
import {bluzelleChain} from 'chains/bluzelle';
import {isChainSupported} from 'chains/common/isChainSupported';

export const allChains: ChainInfo[] = [...evmChains, bluzelleChain].sort((a, b) => {
  if (!isChainSupported(b.chain)) {
    return -1;
  }
  return 0;
});
