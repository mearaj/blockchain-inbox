import {call, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {SagaTokenRequestBody} from 'store/Account/interfaces';
import {allChains, signToken} from 'chains/common';
import {loaderActions} from 'store/Loader';
import {accountsActions} from 'store/Account/reducers';
import {AxiosResponse} from 'axios';
import {login, requestLoginToken} from 'api/login';
import {TokenResponseBody} from 'api/interfaces';

const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);


export function* loginSaga(action: PayloadAction<SagaTokenRequestBody>) {
  yield put(loaderActions.showLoader());
  const {chainName, publicKey, privateKey} = action.payload;
  try {
    const tokenResponse: AxiosResponse<TokenResponseBody> = yield call(requestLoginToken, action.payload);
    const {token} = tokenResponse.data;
    const chainInfo = getChain(chainName);
    if (chainInfo) {
      let signature: string;
      let auth: string;
      let authResponse: AxiosResponse;
      signature = yield call(signToken, privateKey, chainName, token);
      authResponse = yield call(login, {chainName, publicKey, signature, token});
      auth = authResponse.data.auth;
      yield put(accountsActions.addUpdateAccount({publicKey, privateKey, chainName, auth}));
      yield put(accountsActions.setCurrentAccount({publicKey, privateKey, chainName, auth}));
    }
  } catch (e) {
    console.log(e);
  }
  yield put(loaderActions.hideLoader());
}

