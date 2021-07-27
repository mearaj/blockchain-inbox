import {put, select, takeEvery} from 'redux-saga/effects';
import {logoutSaga} from 'store/Account/sagas/logout';
import {loginSaga} from 'store/Account/sagas/login';
import {accountsActions} from 'store/Account/reducers';
import {PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account/interfaces';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {bluzelleChain} from 'chains';
import {messagesAction} from 'store/Messages';

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

export function* setCurrentAccountSaga(action: PayloadAction<Account>) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount) {
    try {
      if (currentAccount.chainName===bluzelleChain.name) {
        yield put(messagesAction.getOutbox());
        yield put(messagesAction.getSent());
      }
      yield put(messagesAction.getInbox());
    } catch (e) {
      console.log(e);
    }
  } else {
    yield put(messagesAction.setOutbox([]));
    yield put(messagesAction.setInbox([]));
  }
  yield put(loaderActions.hideLoader());
}
