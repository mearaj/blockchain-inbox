import {TokenRequestBody} from 'api/interfaces';

export interface Account {
  chainName: string,
  privateKey: string,
  publicKey: string,
  auth: string,
}

export interface CuriumAccount {
  readonly name: string;
  readonly algo: string;
  readonly pubKey: string;
  readonly address: string;
  readonly bech32Address: string;
}


export interface AccountsState {
  currentAccount: Account | undefined;
  accounts: Account[];
}

export interface SagaTokenRequestBody extends TokenRequestBody {
  privateKey: string;
}
