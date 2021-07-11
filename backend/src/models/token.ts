export interface TokenRequest {
  publicKey: string;
  blockchainName: string;
}

export interface TokenResponse {
  uuid: string;
  publicKey: string;
  blockchainName: string;
  signature: string;
}
