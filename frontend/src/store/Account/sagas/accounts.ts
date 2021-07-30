import {put, select} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account/interfaces';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {bluzelleChain} from 'chains';
import {messagesAction} from 'store/Messages';

export function* setCurrentAccountSaga(action: PayloadAction<Account>) {
  yield put(loaderActions.showLoader());
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount) {
    try {
      if (currentAccount.chainName===bluzelleChain.name) {
        yield put(messagesAction.getOutbox());
        yield put(messagesAction.getSent());
      }
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
