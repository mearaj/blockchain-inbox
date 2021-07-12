export interface LoginToken {
  token:string;
  createdAt:number;
}

export interface TokenResponse {
  uuid: string;
  publicKey: string;
  blockchainName: string;
  signature: string;
}
