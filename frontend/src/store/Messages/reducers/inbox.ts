import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {InboxMessage} from 'api';


// Handled by getInboxSaga
export const getInbox = (state: MessagesState, action: PayloadAction) => {
}

export const setInbox = (state: MessagesState, action: PayloadAction<InboxMessage[]>) => {
  state.inbox = action.payload;
}

