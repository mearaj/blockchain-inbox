import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api';

// Handled by sendMessageSaga
export const sendMessage = (state: MessagesState, action: PayloadAction<OutboxMessage>) => {
}

export const sendMessagePending = (state: MessagesState, action: PayloadAction) => {
  state.sendMessageState = action.type
}

export const sendMessageFailure = (state: MessagesState, action: PayloadAction) => {
  state.sendMessageState = action.type
}

export const sendMessageSuccess = (state: MessagesState, action: PayloadAction) => {
  state.sendMessageState = action.type
}
