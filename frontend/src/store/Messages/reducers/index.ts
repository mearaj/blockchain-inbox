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
import {sendMessage} from 'store/Messages/reducers/send';
import {getInbox, setInbox} from 'store/Messages/reducers/inbox';
import {
  claimMessage,
  setClaimMessageId,
  setClaimMessageSignature,
  setClaimMessageSigned
} from 'store/Messages/reducers/claim';
import {getSent, setSent} from 'store/Messages/reducers/sent';
import {
  clearCuriumPaymentState,
  curiumPaymentFailure,
  curiumPaymentPending,
  curiumPaymentSuccess
} from 'store/Messages/reducers/curium';

export const initialState: MessagesState = {
  curiumPaymentState: "",
  curiumPaymentResponse: undefined,
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
    deleteOutboxMessage,
    deleteOutboxMessagePending,
    deleteOutboxMessageSuccess,
    deleteOutboxMessageFailure,
    curiumPaymentPending,
    curiumPaymentSuccess,
    curiumPaymentFailure,
    clearCuriumPaymentState,
    claimMessage,
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


