import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, RenewLeaseReqBody, SentMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {bluzelleChain} from 'chains';
import {accountsActions} from 'store/Account/reducers';
import {PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account';
import {loaderActions} from 'store/Loader';

export function* getSentSaga() {
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.getSentPending());
      const response: AxiosResponse = yield call(api.getSent, currentAccount!.auth);
      const result: SentMessage[] = response.data.sent;
      const timestamp: number = response.data.timestamp;
      yield put(messagesAction.setSentLastFetched(timestamp));
      yield put(messagesAction.setSent(result));
      yield put(messagesAction.getSentSuccess());
    } catch (e) {
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
      yield put(messagesAction.setSent([]));
      yield put(messagesAction.getSentFailure());
    }
  }
}


export function* renewSentMessageLeaseSaga(action: PayloadAction<RenewLeaseReqBody>) {
  yield put(loaderActions.showLoader());
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  try {
    yield call(api.renewSentMessageLease, currentAccount!.auth, action.payload);
    yield put(messagesAction.getSent());
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}

export function* deleteSentMessageSaga(action: PayloadAction<RenewLeaseReqBody>) {
  yield put(loaderActions.showLoader());
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  try {
    yield call(api.deleteSentMessage, currentAccount!.auth, action.payload);
    yield put(messagesAction.getSent());
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}
