import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CuriumState {
  provider: typeof window.ethereum | any | undefined;
  errMsg: string;
}

const initialState = {
  provider: undefined,
  errMsg: "",
}

const setError = (state: CuriumState, action: PayloadAction<any>) => {
  state.errMsg = action.payload;
}

const clearError = (state: CuriumState, action: PayloadAction<any>) => {
  state.errMsg = "";
}

const setProvider = (state: CuriumState, action: PayloadAction<any>) => {
  state.provider = action.payload;
}

const updateState = (state: CuriumState, action: PayloadAction<any>) => {
  state.provider = action.payload.provider;
  state.errMsg = action.payload.errMsg;
}

const curiumSlice = createSlice({
  name: "curiumState",
  initialState: initialState,
  reducers: {
    setError,
    clearError,
    setProvider,
    updateState
  }
})
export const curiumActions = curiumSlice.actions;
export const curiumReducer = curiumSlice.reducer;

export default curiumSlice;
