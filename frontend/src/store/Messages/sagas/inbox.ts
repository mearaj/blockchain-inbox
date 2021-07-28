import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, InboxMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {accountsActions} from 'store/Account/reducers';

export function* getInboxSaga(action: PayloadAction) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount) {
    try {
      const response: AxiosResponse = yield call(api.getInbox, currentAccount!.auth);
      const result: InboxMessage[] = response.data.inbox;
      yield put(messagesAction.setInbox(result));
    } catch (e) {
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
      yield put(messagesAction.setInbox([]));
    }
  }
  yield put(loaderActions.hideLoader());
}

