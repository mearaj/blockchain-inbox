import {call, put, select} from 'redux-saga/effects';
import {Account, accountsActions} from 'store/Account';
import {isLoggedIn, logout} from 'api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AppState} from 'store/reducer';
import {loaderActions} from 'store/Loader';

export function* logoutSaga(action: PayloadAction<Account>) {
  yield put(loaderActions.showLoader());
  const account = action.payload;
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  const accounts: Account[] = appState.accountsState.accounts;
  const newAccounts = accounts.filter((eachAccount) => eachAccount.auth!==account.auth);
  try {
    yield call(logout, account.auth);
    yield put(accountsActions.setAccounts(newAccounts));
    if (currentAccount?.auth===account.auth) {
      yield put(accountsActions.setCurrentAccount(newAccounts[0]));
    }
  } catch (e) {
    console.log(e);
    if (e.message!=="Network Error") {
      try {
        yield call(isLoggedIn, account.auth);
      } catch (e) {
        console.log(e);
        if (e.message!=="Network Error") {
          yield put(accountsActions.setAccounts(newAccounts));
          if (currentAccount?.auth===account.auth) {
            yield put(accountsActions.setCurrentAccount(newAccounts[0]));
          }
        }
      }
    }
  }
  yield put(loaderActions.hideLoader());
}
