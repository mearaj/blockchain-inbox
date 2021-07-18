import {PayloadAction} from '@reduxjs/toolkit';
import {AccountsState} from 'store/Account/interfaces';

export const setSelectedAccountAuth = (state: AccountsState, action: PayloadAction<string>) => {
  if (state.currentAccount) {
    state.currentAccount.auth = action.payload;
  }
}
