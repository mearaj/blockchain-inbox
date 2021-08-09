export interface TokenRequestBody {
  publicKey: string;
  chainName: string;
}

export interface TokenResponseBody {
  token: string;
}

export interface LoginRequestBody {
  token: string;
  publicKey: string;
  chainName: string;
  signature: string;
}

export interface LoginResponseBody {
  auth: string;
}

export interface LoginToken {
  token: string;
  createdAt: number;
}
