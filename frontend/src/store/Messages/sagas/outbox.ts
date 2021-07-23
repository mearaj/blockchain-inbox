import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, OutboxMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';

export function* getOutboxSaga(action: PayloadAction) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount) {
    try {
      const response: AxiosResponse = yield call(api.getOutbox, currentAccount!.auth);
      const result: OutboxMessage[] = response.data;
      yield put(messagesAction.setOutbox(result));
    } catch (e) {
      console.log(e);
    }
  }
  yield put(loaderActions.hideLoader());
}
