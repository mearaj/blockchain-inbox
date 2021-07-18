import {PayloadAction} from '@reduxjs/toolkit';
import {Account, AccountsState} from 'store/Account/interfaces';

export const setCurrentAccount = (state: AccountsState, action: PayloadAction<Account>) => {
  state.currentAccount = action.payload;
}
