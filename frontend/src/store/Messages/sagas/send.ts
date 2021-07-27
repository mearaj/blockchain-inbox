import {PayloadAction} from '@reduxjs/toolkit';
import api, {OutboxMessage} from 'api';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {Account} from 'store/Account';
import {messagesAction} from 'store/Messages/reducers';
import {AxiosResponse} from 'axios';
import {bluzelleChain} from 'chains';

export function* sendMessageSaga(action: PayloadAction<OutboxMessage>) {
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  const message = action.payload;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.sendMessagePending());
      const response: AxiosResponse = yield call(api.sendMessage, currentAccount!.auth, message);
      const id: string = response.data.id;
      yield put(messagesAction.setClaimMessageUuid(id));
      yield put(messagesAction.sendMessageSuccess());
    } catch (e) {
      console.log(e);
      yield put(messagesAction.sendMessageFailure());
    }
  }
}
