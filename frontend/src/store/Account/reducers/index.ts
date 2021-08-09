import {login} from 'store/Account/reducers/login';
import {logout} from 'store/Account/reducers/logout';
import {AccountsState} from 'store/Account/interfaces';
import {createSlice} from '@reduxjs/toolkit';
import {
  addUpdateAccount,
  setAccounts,
  setCurrentAccount,
  setCurrentAccountAuth,
  setSelectedAccountAuth
} from 'store/Account/reducers/accounts';

export const initialState: AccountsState = {
  currentAccount: undefined,
  accounts: [],
};
export const accountsSlice = createSlice({
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
  },
});


export const accountsReducer = accountsSlice.reducer;
export const accountsActions = accountsSlice.actions;
export default accountsSlice;

export {addUpdateAccount, setCurrentAccountAuth, setSelectedAccountAuth, setAccounts, setCurrentAccount, login, logout};
