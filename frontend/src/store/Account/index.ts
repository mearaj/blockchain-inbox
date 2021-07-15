import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Account, WalletNameEnum} from 'store/Account/account';

export interface AccountsState {
  // currentAccount is the public address
  currentAccount: string;
  isLoading: boolean;
  accounts: Accounts;
}

export interface Accounts {
  // key is the public address of account
  [key: string]: Account
}


const initialState: AccountsState = {
  currentAccount: "",
  accounts: {},
  isLoading: false,
};

const setAccounts = (state: AccountsState, action: PayloadAction<Accounts>) => {
  state.accounts = action.payload;
}

const setLoginStatus = (state: AccountsState, action: PayloadAction<boolean>) => {
  if (state.accounts[state.currentAccount]) {
    state.accounts[state.currentAccount].isLoggedIn = action.payload;
  }
}

const setIsLoading = (state: AccountsState, action: PayloadAction<boolean>) => {
  state.isLoading = action.payload
}

const setAccountState = (state: AccountsState, action: PayloadAction<{ account: string, accountState: Account }>) => {
  state.accounts[action.payload.account] = action.payload.accountState;
}

const setCurrentAccount = (state: AccountsState, action: PayloadAction<string>) => {
  state.currentAccount = action.payload;
}

const accountsSlice = createSlice({
  name: 'accountsState',
  initialState,
  reducers: {
    setAccounts,
    setLoginStatus,
    setAccountState,
    setCurrentAccount,
  }
});

export const accountsReducer = accountsSlice.reducer;
export const accountsActions = accountsSlice.actions;

export default accountsSlice;
