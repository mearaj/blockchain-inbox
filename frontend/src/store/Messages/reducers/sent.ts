import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {DeleteMessageReqBody, RenewLeaseReqBody, SentMessage} from 'api/interfaces';


// Handled by getOutboxSaga
export const getSent = (_state: MessagesState, _action: PayloadAction) => {
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

export const renewSentMsgLease = (_state: MessagesState, _action: PayloadAction<RenewLeaseReqBody>) => {

}
export const deleteSentMessage = (_state: MessagesState, _action: PayloadAction<DeleteMessageReqBody>) => {
}


