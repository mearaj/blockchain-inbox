import {put, select} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {Account} from 'store/Account/interfaces';
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
  yield put(messagesAction.setInbox([]));
  yield put(messagesAction.setOutbox([]));
  yield put(messagesAction.setSent([]));

  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  // Currently Outbox and Sent are meant only for Bluzelle Users
  yield put(messagesAction.getInbox());
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    yield put(messagesAction.getOutbox());
    yield put(messagesAction.getSent());
  }
}
