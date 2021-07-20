import {createSlice} from '@reduxjs/toolkit';
import {Account, AccountsState} from 'store/Account/interfaces';
import {
  addUpdateAccount,
  setCurrentAccountAuth,
  setSelectedAccountAuth,
  setAccounts,
  setCurrentAccount,
  login, logout
} from 'store/Account/reducers';


const initialState: AccountsState = {
  currentAccount: undefined,
  accounts: [],
};

const accountsSlice = createSlice({
  name: 'accountsState',
  initialState,
  reducers: {
    setAccounts,
    setCurrentAccountAuth,
    setSelectedAccountAuth,
    addUpdateAccount,
    setCurrentAccount,
    login,
    logout,
  }
});

export const accountsReducer = accountsSlice.reducer;
export const accountsActions = accountsSlice.actions;

export type {Account, AccountsState};
export default accountsSlice;
