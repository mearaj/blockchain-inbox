import {PayloadAction} from '@reduxjs/toolkit';
import {Account, AccountsState} from 'store/Account/interfaces';

export const setAccounts = (state: AccountsState, action: PayloadAction<Account[]>) => {
  state.accounts = action.payload;
}
