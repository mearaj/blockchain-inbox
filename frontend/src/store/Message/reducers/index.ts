import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Message/interfaces';

import {getOutbox, setOutbox} from 'store/Message/reducers/outbox';
import {sendMessage} from 'store/Message/reducers/messages';

export const initialState: MessagesState = {
  inbox:'',
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
  }
});


export const messagesReducer = messagesSlice.reducer;
export const messagesAction = messagesSlice.actions;
export default messagesSlice;


