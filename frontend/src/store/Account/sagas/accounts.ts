import {put, select} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account/interfaces';
import {loaderActions} from 'store/Loader';
import {AppState} from 'store/reducer';
import {bluzelleChain} from 'chains';
import {messagesAction} from 'store/Messages';

/**
 * This saga is listens to accountActions.setCurrentAccount.
 * Whenever current account is set, we want to fetch inbox,sent and outbox messages
 * base upon
 * Upon changing
 * @param action
 */
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
    // If current account is not defined, then we need to clear all inbox, sent and outbox
    yield put(messagesAction.setOutbox([]));
    yield put(messagesAction.setSent([]));
    yield put(messagesAction.setInbox([]));
  }
  yield put(loaderActions.hideLoader());
}
