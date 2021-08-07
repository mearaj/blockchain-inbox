import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {RenewLeaseReqBody, SentMessage} from 'api';


// Handled by getOutboxSaga
export const getSent = (state: MessagesState, action: PayloadAction) => {
}

export const getSentPending = (state: MessagesState, action: PayloadAction) => {
  state.getSentState = action.type;
}

export const getSentSuccess = (state: MessagesState, action: PayloadAction) => {
  state.getSentState = action.type;
}

export const getSentFailure = (state: MessagesState, action: PayloadAction) => {
  state.getSentState = action.type;
}

export const setSent = (state: MessagesState, action: PayloadAction<SentMessage[]>) => {
  state.sent = action.payload;
}

export const setSentLastFetched = (state: MessagesState, action: PayloadAction<number>) => {
  state.sentLastFetched = action.payload;
}

export const setSentMsgDetail = (state: MessagesState, action: PayloadAction<SentMessage>) => {
  state.sentMsgDetail = action.payload;
}

export const renewSentMsgLease = (state: MessagesState, action: PayloadAction<RenewLeaseReqBody>) => {

}
