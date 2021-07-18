import createSagaMiddleware from 'redux-saga';
import {accountsWatcherSaga} from 'store/Account/sagas/login';

export const sageMiddleware = createSagaMiddleware();

export function* rootSaga(){
  yield accountsWatcherSaga();
}
