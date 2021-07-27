import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, SentMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {bluzelleChain} from 'chains';

export function* getSentSaga(action: PayloadAction) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      const response: AxiosResponse = yield call(api.getSent, currentAccount!.auth);
      const result: SentMessage[] = response.data.sent;
      yield put(messagesAction.setSent(result));
    } catch (e) {
      yield put(messagesAction.setSent([]));
      console.log(e);
    }
  }
  yield put(loaderActions.hideLoader());
}


