import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api';


// Handled by getOutboxSaga
export const getOutbox = (state: MessagesState, action: PayloadAction) => {
}

export const setOutbox = (state: MessagesState, action: PayloadAction<OutboxMessage[]>) => {
  state.outbox = action.payload;
}

