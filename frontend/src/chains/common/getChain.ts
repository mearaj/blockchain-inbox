import {allChains} from 'chains/common/allChains';

export const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);
