import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {getOutbox, OutboxMessage} from 'api';
import {messagesAction} from 'store/Message/reducers';

export function* getOutboxSaga(action: PayloadAction) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  console.log("Called or what?")
  if (currentAccount) {
    try {
      const response: AxiosResponse = yield call(getOutbox, currentAccount!.auth);
      const result: OutboxMessage[] = response.data;
      yield put(messagesAction.setOutbox(result));
    } catch (e) {
      console.log(e);
    }
  }
  yield put(loaderActions.hideLoader());
}
