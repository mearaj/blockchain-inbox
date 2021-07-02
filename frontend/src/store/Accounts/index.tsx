import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account';

export interface Accounts {
  // key is the public address of account
  [key:string]: Account
}

const initialState: Accounts = {};


const updateAccounts = (state: Accounts, action: PayloadAction<any>) => {
  return action.payload;
}

const accountsSlice = createSlice({
  name: 'accountsState',
  initialState: initialState,
  reducers: {
    updateAccounts,
  }
})


export const accountsReducer = accountsSlice.reducer;
export const accountsActions = accountsSlice.actions;

export default accountsSlice;
