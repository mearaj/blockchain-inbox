import {PayloadAction} from '@reduxjs/toolkit';
import {put, select} from 'redux-saga/effects';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {messagesAction} from 'store/Messages/reducers';
import {Account} from 'store/Account';
import {bluzelleChain} from 'chains';

export function* setCurrentAccountSaga(action: PayloadAction<Account>) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.getOutbox());
      yield put(messagesAction.getInbox());
    } catch (e) {
      console.log(e);
    }
  } else {
    yield put(messagesAction.setOutbox([]));
    yield put(messagesAction.setInbox([]));
  }
  yield put(loaderActions.hideLoader());
}

