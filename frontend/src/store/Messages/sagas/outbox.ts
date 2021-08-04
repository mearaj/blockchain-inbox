import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, OutboxMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {bluzelleChain} from 'chains';
import {accountsActions} from 'store/Account/reducers';

export function* getOutboxSaga(action: PayloadAction) {
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.getOutboxPending());
      const response: AxiosResponse = yield call(api.getOutbox, currentAccount!.auth);
      const result: OutboxMessage[] = response.data;
      yield put(messagesAction.setOutbox(result));
      yield put(messagesAction.getOutboxSuccess());
    } catch (e) {
      console.log(e);
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
      yield put(messagesAction.setOutbox([]));
      yield put(messagesAction.getOutboxFailure());
    }
  }
}

export function* deleteOutboxMessageSaga(action: PayloadAction) {
  const appState: AppState = yield select();
  const id: string = appState.messagesState.claimMessageId;
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.deleteOutboxMessagePending());
      yield call(api.deleteOutboxMessageById, currentAccount.auth, id);
      yield put(messagesAction.deleteOutboxMessageSuccess());
      yield put(messagesAction.getOutbox());
    } catch (e) {
      console.log(e);
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
    }
  }
}
