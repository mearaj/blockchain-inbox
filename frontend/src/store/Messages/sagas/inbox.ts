import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {accountsActions} from 'store/Account/reducers';
import {loaderActions} from 'store/Loader';
import {Account} from 'store/Account';
import {InboxMessage} from 'api/inbox';
import {RenewLeaseReqBody} from 'api/interfaces';

export function* getInboxSaga(_action: PayloadAction) {
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount) {
    yield put(messagesAction.getInboxPending());
    try {
      const response: AxiosResponse = yield call(api.getInbox, currentAccount!.auth);
      const result: InboxMessage[] = response.data.inbox;
      const timestamp: number = response.data.timestamp;
      yield put(messagesAction.setInboxLastFetched(timestamp));
      yield put(messagesAction.setInbox(result));
      yield put(messagesAction.getInboxSuccess());
      yield
    } catch (e) {
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
      yield put(messagesAction.setInbox([]));
      yield put(messagesAction.getInboxFailure());
    }
  }
}

export function* renewInboxMessageLeaseSaga(action: PayloadAction<RenewLeaseReqBody>) {
  yield put(loaderActions.showLoader());
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  try {
    yield call(api.renewInboxMessageLease, currentAccount!.auth, action.payload);
    yield put(messagesAction.getInbox());
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}


export function* deleteInboxMessageSaga(action: PayloadAction<RenewLeaseReqBody>) {
  yield put(loaderActions.showLoader());
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  try {
    yield call(api.deleteInboxMessage, currentAccount!.auth, action.payload);
    yield put(messagesAction.getInbox());
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}

