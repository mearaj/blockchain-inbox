import {takeEvery} from 'redux-saga/effects';
import {messagesAction} from 'store/Messages/reducers';
import {getOutboxSaga} from 'store/Messages/sagas/outbox';
import {sendMessageSaga} from 'store/Messages/sagas/messages';
import {getInboxSaga} from 'store/Messages/sagas/inbox';
import {accountsActions} from 'store/Account/reducers';
import {setCurrentAccountSaga} from 'store/Messages/sagas/currentAccount';

export function* messagesWatcherSaga() {
  const {sendMessage, getOutbox, getInbox} = messagesAction;
  yield takeEvery(accountsActions.setCurrentAccount.type, setCurrentAccountSaga);
  yield takeEvery(sendMessage.type, sendMessageSaga);
  yield takeEvery(getOutbox.type, getOutboxSaga);
  yield takeEvery(getInbox.type, getInboxSaga);
}


export {getOutboxSaga} from 'store/Messages/sagas/outbox';
export {sendMessageSaga} from 'store/Messages/sagas/messages';
