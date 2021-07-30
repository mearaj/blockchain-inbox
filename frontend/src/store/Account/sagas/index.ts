import {takeEvery} from 'redux-saga/effects';
import {accountsActions} from 'store/Account/reducers';
import {loginSaga} from 'store/Account/sagas/login';
import {logoutSaga} from 'store/Account/sagas/logout';
import {setCurrentAccountSaga} from 'store/Account/sagas/accounts';

export {loginSaga} from './login';
export {logoutSaga} from './logout';
export {setCurrentAccountSaga} from './accounts'

export function* accountsWatcherSaga() {
  const {setCurrentAccount} = accountsActions;
  yield takeEvery(accountsActions.login.type, loginSaga);
  yield takeEvery(accountsActions.logout.type, logoutSaga);
  yield takeEvery(setCurrentAccount.type, setCurrentAccountSaga);
}
