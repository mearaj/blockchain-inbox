import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Messages/interfaces';

import {getOutbox, setOutbox} from 'store/Messages/reducers/outbox';
import {
  sendMessage,
  sendMessageCompleted,
  sendMessageFailure,
  sendMessagePending,
  sendMessageSuccess
} from 'store/Messages/reducers/messages';
import {getInbox, setInbox} from 'store/Messages/reducers/inbox';

export const initialState: MessagesState = {
  sendMessageState: "",
  inbox: [],
  sent: '',
  outbox: [],
};
export const messagesSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    sendMessage,
    sendMessagePending,
    sendMessageSuccess,
    sendMessageFailure,
    sendMessageCompleted,
    getOutbox,
    setOutbox,
    getInbox,
    setInbox,
  }
});


export const messagesReducer = messagesSlice.reducer;
export const messagesAction = messagesSlice.actions;
export default messagesSlice;


