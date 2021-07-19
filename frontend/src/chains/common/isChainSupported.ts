import {AllowedChainEnum} from 'chains/common/chainInfo';

export const isChainSupported = (chain: string) => Object.values(AllowedChainEnum).includes(chain as AllowedChainEnum);
