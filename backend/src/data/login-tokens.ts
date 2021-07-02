export interface RequestToken  {
  // this should be unique string like uuid
  loginToken: string;
  publicAddress: string;
  publicKey: string;
  algorithm: string;
}

const loginAccounts = {};

