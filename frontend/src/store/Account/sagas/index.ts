import {takeEvery} from 'redux-saga/effects';
import {accountsActions} from 'store/Account/reducers';
import {loginSaga} from 'store/Account/sagas/login';
import {logoutSaga} from 'store/Account/sagas/logout';

export {loginSaga} from './login';
export {logoutSaga} from './logout';
export {setCurrentAccountSaga} from './accounts'

export function* accountsWatcherSaga() {
  yield takeEvery(accountsActions.login.type, loginSaga);
  yield takeEvery(accountsActions.logout.type, logoutSaga);
}
