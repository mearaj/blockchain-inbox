import {PayloadAction} from '@reduxjs/toolkit';
import api from 'api';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {Account} from 'store/Account';
import {messagesAction} from 'store/Messages/reducers';
import {AxiosResponse} from 'axios';
import {bluzelleChain} from 'chains';
import {accountsActions} from 'store/Account/reducers';
import {OutboxMessage} from 'api/interfaces';


export function* sendMessageSaga(action: PayloadAction<OutboxMessage>) {
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  const message = action.payload;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      const response: AxiosResponse = yield call(api.sendMessage, currentAccount!.auth, message);
      const id: string = response.data.id;
      yield put(messagesAction.setClaimMessageId(id));
    } catch (e) {
      console.log(e);
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
    }
  }
}
