import createSagaMiddleware from 'redux-saga';
import {all, call} from 'redux-saga/effects'
import {messagesWatcherSaga} from 'store/Messages';
import {accountsWatcherSaga} from 'store/Account/sagas';

export const sageMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([call(accountsWatcherSaga), call(messagesWatcherSaga)]);
}
