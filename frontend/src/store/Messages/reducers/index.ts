import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Messages/interfaces';

import {getOutbox, setOutbox} from 'store/Messages/reducers/outbox';
import {
  sendMessage,
  sendMessageClear,
  sendMessageFailure,
  sendMessagePending,
  sendMessageSuccess
} from 'store/Messages/reducers/send';
import {getInbox, setInbox} from 'store/Messages/reducers/inbox';
import {
  claimMessage, claimMessageClear,
  claimMessageFailure,
  claimMessagePending,
  claimMessageSuccess,
  setClaimMessageSignature,
  setClaimMessageSigned,
  setClaimMessageUuid
} from 'store/Messages/reducers/claim';
import {getSent, setSent} from 'store/Messages/reducers/sent';

export const initialState: MessagesState = {
  sendMessageState: "",
  claimMessageState: "",
  claimMessageSignature: undefined,
  claimMessageSigned: undefined,
  claimMessageUuid: '',
  inbox: [],
  sent: [],
  outbox: []
};
export const messagesSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    sendMessage,
    sendMessagePending,
    sendMessageSuccess,
    sendMessageFailure,
    sendMessageClear,
    claimMessage,
    claimMessagePending,
    claimMessageSuccess,
    claimMessageFailure,
    claimMessageClear,
    setClaimMessageUuid,
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


