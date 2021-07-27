import {takeEvery} from 'redux-saga/effects';
import {messagesAction} from 'store/Messages/reducers';
import {getOutboxSaga} from 'store/Messages/sagas/outbox';
import {sendMessageSaga} from 'store/Messages/sagas/send';
import {getInboxSaga} from 'store/Messages/sagas/inbox';
import {accountsActions} from 'store/Account/reducers';
import {setCurrentAccountSaga} from 'store/Account/sagas';
import {claimMessageSaga} from 'store/Messages/sagas/claim';
import {getSentSaga} from 'store/Messages/sagas/sent';

export function* messagesWatcherSaga() {
  const {setCurrentAccount} = accountsActions;
  const {sendMessage, getOutbox, getInbox, claimMessage, getSent} = messagesAction;
  yield takeEvery(setCurrentAccount.type, setCurrentAccountSaga);
  yield takeEvery(sendMessage.type, sendMessageSaga);
  yield takeEvery(claimMessage.type, claimMessageSaga);
  yield takeEvery(getOutbox.type, getOutboxSaga);
  yield takeEvery(getInbox.type, getInboxSaga);
  yield takeEvery(getSent.type, getSentSaga);
}


export {getOutboxSaga} from 'store/Messages/sagas/outbox';
export {sendMessageSaga} from 'store/Messages/sagas/send';
export {claimMessageSaga} from 'store/Messages/sagas/claim';
export {getSentSaga} from 'store/Messages/sagas/sent';
