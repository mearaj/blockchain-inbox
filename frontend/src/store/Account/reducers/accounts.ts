import {Account, AccountsState} from 'store/Account/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';

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
export const setAccounts = (state: AccountsState, action: PayloadAction<Account[]>) => {
  state.accounts = action.payload;
}
export const setCurrentAccount = (state: AccountsState, action: PayloadAction<Account>) => {
  state.currentAccount = action.payload;
}

export const setCurrentAccountAuth = (state: AccountsState, action: PayloadAction<string>) => {
  if (state.currentAccount) {
    state.currentAccount.auth = action.payload;
  }
}
export const setSelectedAccountAuth = (state: AccountsState, action: PayloadAction<string>) => {
  if (state.currentAccount) {
    state.currentAccount.auth = action.payload;
  }
}
