import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Messages/interfaces';

import {getOutbox, setOutbox} from 'store/Messages/reducers/outbox';
import {sendMessage} from 'store/Messages/reducers/messages';
import {getInbox, setInbox} from 'store/Messages/reducers/inbox';

export const initialState: MessagesState = {
  inbox: [],
  sent: '',
  outbox: [],
};
export const messagesSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    sendMessage,
    getOutbox,
    setOutbox,
    getInbox,
    setInbox
  }
});


export const messagesReducer = messagesSlice.reducer;
export const messagesAction = messagesSlice.actions;
export default messagesSlice;


