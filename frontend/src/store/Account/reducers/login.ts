import {AccountsState, SagaTokenRequestBody} from 'store/Account/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';

export const login = (state:AccountsState, action:  PayloadAction<SagaTokenRequestBody>) => {
  return state;
}
