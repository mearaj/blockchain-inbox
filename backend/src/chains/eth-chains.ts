import {chains} from 'chains/chains';
import {Chain} from 'chains/index';

export const ethChains = chains.filter((chain:Chain)=> chain.chain.toUpperCase() === "eth");
