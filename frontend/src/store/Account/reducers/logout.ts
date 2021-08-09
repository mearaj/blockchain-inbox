import {Account, AccountsState} from 'store/Account/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';


// Note: handled by logoutSaga
export const logout = (state: AccountsState, _action: PayloadAction<Account>) => state;
