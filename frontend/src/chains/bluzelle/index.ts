import {ChainInfo} from 'chains/common/chainInfo';
import {AllowedChainEnum} from 'chains/common/chainInfo';

export const bluzelleChain:ChainInfo = {
  name: "Bluzelle Mainnet",
  chain: AllowedChainEnum.Bluzelle,
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

export {signTokenForBlzChain} from './helper';
