import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api/interfaces';


// Handled by getOutboxSaga
export const getOutbox = (_state: MessagesState, _action: PayloadAction) => {
}

export const getOutboxPending = (state: MessagesState, action: PayloadAction) => {
  state.getOutboxState = action.type;
}

export const getOutboxSuccess = (state: MessagesState, action: PayloadAction) => {
  state.getOutboxState = action.type;
}
export const getOutboxFailure = (state: MessagesState, action: PayloadAction) => {
  state.getOutboxState = action.type;
}


export const setOutbox = (state: MessagesState, action: PayloadAction<OutboxMessage[]>) => {
  state.outbox = action.payload;
}

// Handled by deleteOutboxMessageSaga
export const deleteOutboxMessage = (_state: MessagesState) => {
}

export const deleteOutboxMessagePending = (state: MessagesState, action: PayloadAction) => {
  state.deleteOutboxMessageState = action.type
}

export const deleteOutboxMessageFailure = (state: MessagesState, action: PayloadAction) => {
  state.deleteOutboxMessageState = action.type
}

export const deleteOutboxMessageSuccess = (state: MessagesState, action: PayloadAction) => {
  state.deleteOutboxMessageState = action.type
}

export const setOutboxMsgDetail = (state: MessagesState, action: PayloadAction<OutboxMessage>) => {
  state.outboxMsgDetail = action.payload;
}

