import {takeEvery} from 'redux-saga/effects';
import {messagesAction} from 'store/Message/reducers';
import {getOutboxSaga} from 'store/Message/sagas/outbox';
import {sendMessageSaga} from 'store/Message/sagas/messages';

export function* messagesWatcherSaga() {
  const {sendMessage, getOutbox} = messagesAction;
  yield takeEvery(sendMessage.type, sendMessageSaga);
  yield takeEvery(getOutbox.type, getOutboxSaga);
}


export {getOutboxSaga} from 'store/Message/sagas/outbox';
export {sendMessageSaga} from 'store/Message/sagas/messages';
