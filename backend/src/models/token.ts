export interface TokenRequestBody {
  publicKey: string;
  chainName: string;
}

export interface TokenResponse {
  uuid: string;
  publicKey: string;
  blockchainName: string;
  signature: string;
}

export interface LoginRequestBody {
  token: string;
  publicKey: string;
  chainName: string;
  signature: string;
}

export interface LoginToken {
  token: string;
  createdAt: number;
}
