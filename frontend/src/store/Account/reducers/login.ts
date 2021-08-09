import {AccountsState, SagaTokenRequestBody} from 'store/Account/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';


// Note: handled by loginSaga
export const login = (state: AccountsState, _action: PayloadAction<SagaTokenRequestBody>) => state;
