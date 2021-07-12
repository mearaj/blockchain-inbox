// Ref https://github.com/ethereum-lists/chains and
// Ref https://chainid.network/chains.json
// Ref https://github.com/taylorjdawson/eth-chains/blob/main/src/types.ts

import chains from 'chains/chains';
import {Chain} from 'chains/chain';

export const ethChains: { name: string, chain: string }[] = chains.filter((chain: Chain) => chain.chain.toLowerCase()==="eth").map((chain) => (
  {
    name: chain.name,
    chain: chain.chain
  }
));

export const allowedChainNames: { name: string, chain: string }[] = [...ethChains, {
  name: "Bluzelle Mainnet",
  chain: "Bluzelle"
}];

export default allowedChainNames;
