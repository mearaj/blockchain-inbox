import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Messages/interfaces';

import {
  deleteOutboxMessage,
  deleteOutboxMessageFailure,
  deleteOutboxMessagePending,
  deleteOutboxMessageSuccess,
  getOutbox,
  setOutbox
} from 'store/Messages/reducers/outbox';
import {sendMessage, sendMessageFailure, sendMessagePending, sendMessageSuccess} from 'store/Messages/reducers/send';
import {getInbox, setInbox} from 'store/Messages/reducers/inbox';
import {
  claimMessage,
  claimMessageFailure,
  claimMessagePending,
  claimMessageSuccess,
  setClaimMessageSignature,
  setClaimMessageSigned,
  setClaimMessageId
} from 'store/Messages/reducers/claim';
import {getSent, setSent} from 'store/Messages/reducers/sent';

export const initialState: MessagesState = {
  sendMessageState: "",
  claimMessageState: "",
  deleteOutboxMessageState: "",
  claimMessageSignature: undefined,
  claimMessageSigned: undefined,
  claimMessageId: '',
  inbox: [],
  sent: [],
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
    deleteOutboxMessage,
    deleteOutboxMessagePending,
    deleteOutboxMessageSuccess,
    deleteOutboxMessageFailure,
    claimMessage,
    claimMessagePending,
    claimMessageSuccess,
    claimMessageFailure,
    setClaimMessageId,
    setClaimMessageSignature,
    setClaimMessageSigned,
    getOutbox,
    setOutbox,
    getInbox,
    setInbox,
    setSent,
    getSent,
  }
});


export const messagesReducer = messagesSlice.reducer;
export const messagesAction = messagesSlice.actions;
export default messagesSlice;


