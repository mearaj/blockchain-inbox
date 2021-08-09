import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {InboxMessage} from 'api/inbox';
import {DeleteMessageReqBody, RenewLeaseReqBody} from 'api/interfaces';


// Handled by getInboxSaga
export const getInbox = (_state: MessagesState, _action: PayloadAction) => {
}

export const getInboxPending = (state: MessagesState, action: PayloadAction) => {
  state.getInboxState = action.type;
}

export const getInboxSuccess = (state: MessagesState, action: PayloadAction) => {
  state.getInboxState = action.type;
}

export const getInboxFailure = (state: MessagesState, action: PayloadAction) => {
  state.getInboxState = action.type;
}

export const setInbox = (state: MessagesState, action: PayloadAction<InboxMessage[]>) => {
  state.inbox = action.payload;
}
export const setInboxLastFetched = (state: MessagesState, action: PayloadAction<number>) => {
  state.inboxLastFetched = action.payload;
}


export const setInboxMsgDetail = (state: MessagesState, action: PayloadAction<InboxMessage>) => {
  state.inboxMsgDetail = action.payload;
}

export const renewInboxMsgLease = (_state: MessagesState, _action: PayloadAction<RenewLeaseReqBody>) => {
}

export const deleteInboxMessage = (_state: MessagesState, _action: PayloadAction<DeleteMessageReqBody>) => {
}

