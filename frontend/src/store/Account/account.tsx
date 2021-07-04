export enum AccountWallet {
  METAMASK_EXTENSION_WALLET = 'METAMASK_EXTENSION_WALLET',
  CURIUM_EXTENSION_WALLET = 'CURIUM_EXTENSION_WALLET',
}


export interface Account {
  wallet: AccountWallet | undefined,
  isLoggedIn: boolean,
  loginToken?:string,
  loginTokenSignature?: string,
  publicAddress: string,
  publicKey: string,
}
