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

const login = (state: Account, action: PayloadAction) => {
  state.isLoggedIn = true;
}

const logout = (state: Account, action: PayloadAction) => {
  state.isLoggedIn = false;
}

const updateAccountState = (state: Account, action: PayloadAction<any>) => {
  state.isLoggedIn = action.payload.isLoggedIn;
  state.publicAddress = action.payload.publicAddress;
  state.wallet = action.payload.wallet;
  state.publicKey = action.payload.publicKey;
  return state;
}

const accountSlice = createSlice({
  name: 'accountState',
  initialState: initialState,
  reducers: {
    login,
    logout,
    updateAccountState,
  }
})


export const accountReducer = accountSlice.reducer;
export const accountActions = accountSlice.actions;

export default accountSlice;
