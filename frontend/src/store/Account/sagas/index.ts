import {takeEvery} from 'redux-saga/effects';
import {logoutSaga} from 'store/Account/sagas/logout';
import {loginSaga} from 'store/Account/sagas/login';
import {accountsActions} from 'store/Account/reducers';

export function* accountsWatcherSaga() {
  yield takeEvery(accountsActions.login.type, loginSaga);
  yield takeEvery(accountsActions.logout.type, logoutSaga);
  // console.log(response);
  // console.log(response2);
  // const action: PayloadAction<TokenRequestBody> = yield take(accountsActions.login.type);
  // console.log(action);
  // const loginToken: TokenResponseBody = yield call(requestLoginToken, action.payload);
  // console.log(action, loginToken);
  // return {action,loginToken};
}

export {loginSaga} from './login';
export {logoutSaga} from './logout';
