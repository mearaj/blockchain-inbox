import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface AccountState {
  isRegistered: boolean,
  isLoggedIn: boolean,
  publicAddress: string,
  publicKey: string,
}

const initialState: AccountState = {
  isRegistered: true,
  isLoggedIn: false,
  publicAddress: "",
  publicKey: "",
}

const register = (state: AccountState, action: PayloadAction) => {
  state.isRegistered = true;
}

const login = (state: AccountState, action: PayloadAction) => {
  state.isLoggedIn = true;
}

const logout = (state: AccountState, action: PayloadAction) => {
  state.isLoggedIn = false;
}

const accountSlice = createSlice({
  name: 'accountState',
  initialState: initialState,
  reducers: {
    login,
    logout,
  }
})


export const accountReducer = accountSlice.reducer;
export const accountActions = accountSlice.actions;

export default accountSlice;
