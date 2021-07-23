import {PayloadAction} from '@reduxjs/toolkit';
import api, {OutboxMessage} from 'api';
import {call, put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';

export function* sendMessageSaga(action: PayloadAction<OutboxMessage>) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  const message = action.payload;
  try {
    yield call(api.sendMessage, currentAccount!.auth, message);
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}
