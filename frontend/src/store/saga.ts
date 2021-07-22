import createSagaMiddleware from 'redux-saga';
import {all, call} from 'redux-saga/effects'
import {accountsWatcherSaga} from 'store/Account/sagas';
import {messagesWatcherSaga} from 'store/Message';

export const sageMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([call(accountsWatcherSaga), call(messagesWatcherSaga)]);
}
