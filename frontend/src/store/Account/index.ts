import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account/account';

export interface AccountsState {
  currentAccount: Account | undefined;
  accounts: Account[];
}

const initialState: AccountsState = {
  currentAccount: undefined,
  accounts: [],
};

const setAccounts = (state: AccountsState, action: PayloadAction<Account[]>) => {
  state.accounts = action.payload;
}

const setAuth = (state: AccountsState, action: PayloadAction<string>) => {
  if (state.currentAccount) {
    state.currentAccount.auth = action.payload;
  }
}

const setAccountState = (state: AccountsState, action: PayloadAction<{ accountState: Account }>) => {
  const found = state.accounts
    .find((eachAccount) => (eachAccount.chainName===action.payload.accountState.chainName) &&
      eachAccount.publicKey===action.payload.accountState.publicKey);
  if (!found) {
    state.accounts.push(action.payload.accountState);
    return
  }
  state.accounts = state.accounts.map((eachAccount) => {
    if ((eachAccount.publicKey===found.publicKey) &&
      (eachAccount.chainName===found.chainName)) {
      return {...eachAccount, ...action.payload.accountState}
    }
    return eachAccount;
  })
}

const setCurrentAccount = (state: AccountsState, action: PayloadAction<Account>) => {
  state.currentAccount = action.payload;
}

const accountsSlice = createSlice({
  name: 'accountsState',
  initialState,
  reducers: {
    setAccounts,
    setAuth,
    setAccountState,
    setCurrentAccount,
  }
});

export const accountsReducer = accountsSlice.reducer;
export const accountsActions = accountsSlice.actions;

export default accountsSlice;
