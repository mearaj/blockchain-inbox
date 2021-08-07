import {createSlice} from '@reduxjs/toolkit';
import {MessagesState} from 'store/Messages/interfaces';

import {
  deleteOutboxMessage,
  deleteOutboxMessageFailure,
  deleteOutboxMessagePending,
  deleteOutboxMessageSuccess,
  getOutbox,
  getOutboxFailure,
  getOutboxPending,
  getOutboxSuccess,
  setOutbox,
  setOutboxMsgDetail
} from 'store/Messages/reducers/outbox';
import {sendMessage} from 'store/Messages/reducers/send';
import {
  getInbox,
  getInboxFailure,
  getInboxPending,
  getInboxSuccess, renewInboxMsgLease,
  setInbox,
  setInboxLastFetched,
  setInboxMsgDetail
} from 'store/Messages/reducers/inbox';

import {
  claimMessage,
  setClaimMessageId,
  setClaimMessageSignature,
  setClaimMessageSigned
} from 'store/Messages/reducers/claim';

import {
  getSent,
  getSentFailure,
  getSentPending,
  getSentSuccess,
  renewSentMsgLease,
  setSent, setSentLastFetched,
  setSentMsgDetail
} from 'store/Messages/reducers/sent';

export const initialState: MessagesState = {
  curiumPaymentState: "",
  curiumPaymentResponse: undefined,
  deleteOutboxMessageState: "",
  claimMessageSignature: undefined,
  claimMessageSigned: undefined,
  claimMessageId: '',
  inbox: [],
  getInboxState: '',
  inboxLastFetched: Date.now().valueOf(),
  sentLastFetched: Date.now().valueOf(),
  inboxMsgDetail: undefined,
  outbox: [],
  getOutboxState: '',
  outboxMsgDetail: undefined,
  sent: [],
  getSentState: '',
  sentMsgDetail: undefined,
};
export const messagesSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    sendMessage,
    deleteOutboxMessage,
    deleteOutboxMessagePending,
    deleteOutboxMessageSuccess,
    deleteOutboxMessageFailure,
    claimMessage,
    setClaimMessageId,
    setClaimMessageSignature,
    setClaimMessageSigned,
    getOutbox,
    getOutboxPending,
    getOutboxFailure,
    getOutboxSuccess,
    setOutbox,
    setOutboxMsgDetail,
    getInbox,
    getInboxPending,
    getInboxFailure,
    getInboxSuccess,
    setInbox,
    setInboxLastFetched,
    setInboxMsgDetail,
    renewInboxMsgLease,
    setSent,
    setSentLastFetched,
    getSent,
    getSentPending,
    getSentFailure,
    getSentSuccess,
    setSentMsgDetail,
    renewSentMsgLease,
  }
});


export const messagesReducer = messagesSlice.reducer;
export const messagesAction = messagesSlice.actions;
export default messagesSlice;


