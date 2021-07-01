import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MetamaskState {
  provider: typeof window.ethereum | any | undefined;
  errMsg: string;
}

const initialState = {
  provider: undefined,
  errMsg: "",
}

const setError = (state: MetamaskState, action: PayloadAction<any>) => {
  state.errMsg = action.payload;
}

const clearError = (state: MetamaskState, action: PayloadAction<any>) => {
  state.errMsg = "";
}

const setProvider = (state: MetamaskState, action: PayloadAction<any>) => {
  state.provider = action.payload;
}

const updateState = (state: MetamaskState, action: PayloadAction<any>) => {
  state.provider = action.payload.provider;
  state.errMsg = action.payload.errMsg;
}

const metamaskSlice = createSlice({
  name: "metamaskState",
  initialState: initialState,
  reducers: {
    setError,
    clearError,
    setProvider,
    updateState
  }
})

export const metamaskActions = metamaskSlice.actions;
export const metamaskReducer = metamaskSlice.reducer;

export default metamaskSlice;
