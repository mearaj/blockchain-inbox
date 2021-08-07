import {takeEvery} from 'redux-saga/effects';
import {messagesAction} from 'store/Messages/reducers';
import {deleteOutboxMessageSaga, getOutboxSaga} from 'store/Messages/sagas/outbox';
import {sendMessageSaga} from 'store/Messages/sagas/send';
import {deleteInboxMessageSaga, getInboxSaga, renewInboxMessageLeaseSaga} from 'store/Messages/sagas/inbox';
import {claimMessageSaga} from 'store/Messages/sagas/claim';
import {deleteSentMessageSaga, getSentSaga, renewSentMessageLeaseSaga} from 'store/Messages/sagas/sent';


export function* messagesWatcherSaga() {
  const {
    sendMessage,
    deleteOutboxMessage,
    getOutbox,
    getInbox,
    claimMessage,
    getSent,
    renewSentMsgLease,
    renewInboxMsgLease,
    deleteSentMessage,
    deleteInboxMessage,
  } = messagesAction;
  yield takeEvery(sendMessage.type, sendMessageSaga);
  yield takeEvery(deleteOutboxMessage.type, deleteOutboxMessageSaga);
  yield takeEvery(claimMessage.type, claimMessageSaga);
  yield takeEvery(getOutbox.type, getOutboxSaga);
  yield takeEvery(getInbox.type, getInboxSaga);
  yield takeEvery(getSent.type, getSentSaga);
  yield takeEvery(renewInboxMsgLease.type, renewInboxMessageLeaseSaga);
  yield takeEvery(renewSentMsgLease.type, renewSentMessageLeaseSaga);
  yield takeEvery(deleteInboxMessage.type, deleteInboxMessageSaga);
  yield takeEvery(deleteSentMessage.type, deleteSentMessageSaga);
}


export {getOutboxSaga} from 'store/Messages/sagas/outbox';
export {sendMessageSaga} from 'store/Messages/sagas/send';
export {claimMessageSaga} from 'store/Messages/sagas/claim';
export {getSentSaga} from 'store/Messages/sagas/sent';

