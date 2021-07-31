import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {AminoSignResponse} from '@cosmjs/launchpad';


export const curiumPaymentPending = (state: MessagesState, action: PayloadAction) => {
  state.curiumPaymentState = action.type
  state.curiumPaymentResponse = undefined;
}

export const curiumPaymentFailure = (state: MessagesState, action: PayloadAction) => {
  state.curiumPaymentState = action.type
  state.curiumPaymentResponse = undefined
}

export const curiumPaymentSuccess = (state: MessagesState, action: PayloadAction<AminoSignResponse>) => {
  state.curiumPaymentState = action.type
  state.curiumPaymentResponse = action.payload;
}

export const clearCuriumPaymentState = (state: MessagesState, action: PayloadAction) => {
  state.curiumPaymentState = ""
  state.curiumPaymentResponse = undefined;
}
