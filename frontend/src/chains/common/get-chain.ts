import {allChains} from 'chains/index';

export const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);
