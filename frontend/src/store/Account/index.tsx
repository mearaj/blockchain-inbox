import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum AccountWallet {
  METAMASK_EXTENSION_WALLET = 'METAMASK_EXTENSION_WALLET',
  CURIUM_EXTENSION_WALLET = 'CURIUM_EXTENSION_WALLET',
}


export interface Account {
  wallet: AccountWallet | undefined,
  isLoggedIn: boolean,
  publicAddress: string,
  publicKey: string,
}

const initialState: Account = {
  wallet: undefined,
  isLoggedIn: false,
  publicAddress: "",
  publicKey: "",
}

const setLoginStatus = (state: Account, action: PayloadAction<boolean>) => {
  state.isLoggedIn = action.payload;
}

const updateAccountState = (state: Account, action: PayloadAction<Account>) => action.payload;

const accountSlice = createSlice({
  name: 'accountState',
  initialState: initialState,
  reducers: {
    setLoginStatus,
    updateAccountState,
  }
})

export const accountReducer = accountSlice.reducer;
export const accountActions = accountSlice.actions;

export default accountSlice;
