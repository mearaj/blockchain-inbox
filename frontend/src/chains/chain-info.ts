// Ref https://chainid.network/

export interface ChainInfo {
  name: string,
  chainId: number,
  shortName: string,
  chain: string,
  network: string,
  networkId: number,
  nativeCurrency: ChainNativeCurrency,
  rpc: string[],
  faucets: string[],
  explorers?: ChainExplorer[],
  infoURL: string
  slip44?:number;
  icon?: string;
  ens?: {registry:string}
  parent?: {
    chain: string,
    type: string
  }
}

export interface ChainNativeCurrency {
  name: string,
  symbol: string,
  decimals: number
}

export interface ChainExplorer {
  name: string,
  url: string,
  standard: string,
  icon?: string
}

export interface ChainShortInfo {
  name: string;
  chain: string;
}
// Refers to the chain property of ChainInfo
export enum AllowedChainEnum {
  ETH = "ETH",
  BLUZELLE = "Bluzelle"
}


