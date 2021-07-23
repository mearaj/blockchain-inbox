import {AccountsState, SagaTokenRequestBody} from 'store/Account/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';


// Note: handled by loginSaga
export const login = (state: AccountsState, action: PayloadAction<SagaTokenRequestBody>) => state;
