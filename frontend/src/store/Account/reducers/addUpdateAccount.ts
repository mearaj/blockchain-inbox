import {PayloadAction} from '@reduxjs/toolkit';
import {Account, AccountsState} from 'store/Account/interfaces';

export const addUpdateAccount = (state: AccountsState, action: PayloadAction<Account>) => {
  const account = action.payload;
  const found = state.accounts
    .find((eachAccount) => (eachAccount.chainName===account.chainName) &&
      eachAccount.publicKey===account.publicKey);
  if (!found) {
    state.accounts.push(account);
    return
  }
  state.accounts = state.accounts.map((eachAccount) => {
    if ((eachAccount.publicKey===found.publicKey) &&
      (eachAccount.chainName===found.chainName)) {
      return {...eachAccount, ...account}
    }
    return eachAccount;
  })
}
