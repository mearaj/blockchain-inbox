import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface ComposeState {
  recipientPublicKey: string;
  recipientChainName: string;
  recipientErrMsg: string;
  senderPublicKey:string;
  senderChainName:string;
  senderErrMsg: string;
  message: string;
}


const initialState: ComposeState = {
  recipientPublicKey: "",
  recipientChainName:"",
  recipientErrMsg:"",
  senderPublicKey:"",
  senderChainName:"",
  senderErrMsg: "",
  message: ""
};


const setTo = (state: ComposeState, action: PayloadAction<string>) => {
  state.recipientPublicKey = action.payload;
}

const setToErrMsg = (state: ComposeState, action: PayloadAction<string>) => {
  state.recipientErrMsg = action.payload;
}

const setFrom = (state: ComposeState, action: PayloadAction<string>) => {
  state.senderPublicKey = action.payload;
}

const setFromErrMsg = (state: ComposeState, action: PayloadAction<string>) => {
  state.senderErrMsg = action.payload;
}


const setMessage = (state: ComposeState, action:PayloadAction<string>) => {
  state.message = action.payload;
}

const setRecipientChainName = (state: ComposeState, action:PayloadAction<string>) => {
  state.recipientChainName = action.payload;
}

const updateState = (state: ComposeState, action:PayloadAction<ComposeState>) => action.payload;

const composeSlice = createSlice({
  name: 'composeState',
  initialState: initialState,
  reducers: {
    setTo,
    setToErrMsg,
    setFrom,
    setFromErrMsg,
    setMessage,
    setRecipientChainName,
    updateState
  }
});

export const composeActions = composeSlice.actions;
export const composeReducer = composeSlice.reducer;

export default composeSlice;

