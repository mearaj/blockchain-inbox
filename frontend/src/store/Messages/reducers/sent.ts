import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage, SentMessage} from 'api';


// Handled by getOutboxSaga
export const getSent = (state: MessagesState, action: PayloadAction) => {
}

export const setSent = (state: MessagesState, action: PayloadAction<SentMessage[]>) => {
  state.sent = action.payload;
}

