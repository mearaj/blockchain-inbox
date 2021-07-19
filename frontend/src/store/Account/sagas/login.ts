import {call, put, select, takeEvery} from 'redux-saga/effects';
import {accountsActions} from 'store/Account';
import {login, LoginResponseBody, requestLoginToken, TokenResponseBody} from 'api';
import {PayloadAction} from '@reduxjs/toolkit';
import {SagaTokenRequestBody} from 'store/Account/interfaces';
import {AppState} from 'store/reducer';
import {allChains, signToken} from 'chains/common';

const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);


export function* requestLoginTokenSaga(action: PayloadAction<SagaTokenRequestBody>) {
  const {chainName, publicKey, privateKey} = action.payload;
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  const tokenResponse: TokenResponseBody = yield call(requestLoginToken, action.payload);
  const {token} = tokenResponse;
  const chainInfo = getChain(chainName);
  if (chainInfo) {
    let signature: string;
    let auth: string;
    let authResponse: LoginResponseBody;
    try {
      signature = yield call(signToken, privateKey, chainName, token);
      authResponse = yield call(login, {chainName, publicKey, signature, token});
      auth = authResponse.auth;
      yield put(accountsActions.addUpdateAccount({publicKey, privateKey, chainName, auth}));
      if (!currentAccount) {
        yield put(accountsActions.setCurrentAccount({publicKey, privateKey, chainName, auth}));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function* accountsWatcherSaga() {
  const response: TokenResponseBody = yield takeEvery(accountsActions.login.type, requestLoginTokenSaga);
  console.log(response);
  // const action: PayloadAction<TokenRequestBody> = yield take(accountsActions.login.type);
  // console.log(action);
  // const loginToken: TokenResponseBody = yield call(requestLoginToken, action.payload);
  // console.log(action, loginToken);
  // return {action,loginToken};
}
