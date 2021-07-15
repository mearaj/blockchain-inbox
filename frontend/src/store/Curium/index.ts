import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CuriumState {
  errMsg: string;
  isConnected: boolean;
}

const initialState = {
  errMsg: "",
  isConnected: false,
}

const setIsConnected = (state: CuriumState, action: PayloadAction<boolean>) => {
  state.isConnected = action.payload;
}

const setError = (state: CuriumState, action: PayloadAction<string>) => {
  state.errMsg = action.payload;
}

const clearError = (state: CuriumState) => {
  state.errMsg = "";
}

const updateState = (state: CuriumState, action: PayloadAction<CuriumState>) => {
  return {...state, ...action.payload};
}

const curiumSlice = createSlice({
  name: "curiumState",
  initialState: initialState,
  reducers: {
    setError,
    clearError,
    updateState,
    setIsConnected,
  }
});

export const curiumActions = curiumSlice.actions;
export const curiumReducer = curiumSlice.reducer;

export default curiumSlice;
