import {TokenRequestBody} from 'api';

export interface Account {
  chainName: string,
  privateKey: string,
  publicKey: string,
  auth: string,
}

export interface AccountsState {
  currentAccount: Account | undefined;
  accounts: Account[];
}
export interface SagaTokenRequestBody extends TokenRequestBody {
  privateKey: string;
}
