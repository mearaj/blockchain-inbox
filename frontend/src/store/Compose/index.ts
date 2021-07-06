import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface ComposeState {
  to: string;
  toErrMsg: string;
  from:string;
  fromErrMsg: string;
  message: string;
}

const initialState: ComposeState = {
  to: "",
  toErrMsg:"",
  from:"",
  fromErrMsg: "",
  message: ""
};


const setTo = (state: ComposeState, action: PayloadAction<string>) => {
  state.to = action.payload;
}

const setToErrMsg = (state: ComposeState, action: PayloadAction<string>) => {
  state.toErrMsg = action.payload;
}

const setFrom = (state: ComposeState, action: PayloadAction<string>) => {
  state.from = action.payload;
}

const setFromErrMsg = (state: ComposeState, action: PayloadAction<string>) => {
  state.fromErrMsg = action.payload;
}


const setMessage = (state: ComposeState, action:PayloadAction<string>) => {
  state.message = action.payload;
}

const updateState = (state: ComposeState, action:PayloadAction<ComposeState | any>) => {
  return {...state, ...action.payload};
}

const composeSlice = createSlice({
  name: 'composeState',
  initialState: initialState,
  reducers: {
    setTo,
    setToErrMsg,
    setFrom,
    setFromErrMsg,
    setMessage,
    updateState
  }
});

export const composeActions = composeSlice.actions;
export const composeReducer = composeSlice.reducer;

export default composeSlice;

