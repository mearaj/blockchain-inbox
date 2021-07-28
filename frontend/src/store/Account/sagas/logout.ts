import {call, put, select} from 'redux-saga/effects';
import {Account} from 'store/Account';
import api, {logout} from 'api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AppState} from 'store/reducer';
import {loaderActions} from 'store/Loader';
import {accountsActions} from 'store/Account/reducers';


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
    // if there's no connection, then user shouldn't be able to logout, because server cannot be informed
    if (!e.message.toLowerCase().contains("network error")) {
      try {
        yield call(api.getLoginStatus, account.auth);
      } catch (e) {
        // if there's no connection, then user shouldn't be able to logout, because server cannot be informed
        if (!e.message.toLowerCase().contains("network error")) {
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
