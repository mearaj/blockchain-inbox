import {PayloadAction} from '@reduxjs/toolkit';
import api, {OutboxMessage} from 'api';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {Account} from 'store/Account';
import {messagesAction} from 'store/Messages/reducers';

export function* sendMessageSaga(action: PayloadAction<OutboxMessage>) {

  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  const message = action.payload;
  try {
    yield put(messagesAction.sendMessagePending());
    yield call(api.sendMessage, currentAccount!.auth, message);
    yield put(messagesAction.sendMessageSuccess());
  } catch (e) {
    console.log(e);
    yield put(messagesAction.sendMessageFailure());
  }
}
