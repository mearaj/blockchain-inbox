export enum WalletNameEnum {
  METAMASK_EXTENSION_WALLET = 'Metamask',
  CURIUM_EXTENSION_WALLET = 'Curium',
}


export interface Account {
  wallet: WalletNameEnum | undefined,
  isLoggedIn: boolean,
  loginToken?: string,
  loginTokenSignature?: string,
  publicAddress: string,
  publicKey: string,
}
