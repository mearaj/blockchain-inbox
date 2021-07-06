import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MetamaskState {
  errMsg: string;
  isConnected: boolean;
}

const initialState = {
  errMsg: "",
  isConnected: false,
}

const setIsConnected = (state: MetamaskState, action: PayloadAction<boolean>) => {
  state.isConnected = action.payload;
}

const setError = (state: MetamaskState, action: PayloadAction<string>) => {
  state.errMsg = action.payload;
}

const clearError = (state: MetamaskState) => {
  state.errMsg = "";
}


const updateState = (state: MetamaskState, action: PayloadAction<MetamaskState>) => {
  return {...state, ...action.payload};
}

const metamaskSlice = createSlice({
  name: "metamaskState",
  initialState: initialState,
  reducers: {
    setError,
    clearError,
    updateState,
    setIsConnected
  }
})

export const metamaskActions = metamaskSlice.actions;
export const metamaskReducer = metamaskSlice.reducer;

export default metamaskSlice;
