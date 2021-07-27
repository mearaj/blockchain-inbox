import {PayloadAction} from '@reduxjs/toolkit';
import api, {ClaimMessage, OutboxMessage} from 'api';
import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {Account} from 'store/Account';
import {messagesAction} from 'store/Messages/reducers';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';

export function* claimMessageSaga(action: PayloadAction<{ signature:StdSignature, signed:StdSignDoc }>) {
  const currentAccount: Account = yield select((state: AppState) => state.accountsState.currentAccount);
  const uuid: string = yield select((state: AppState) => state.messagesState.claimMessageUuid);
  const message = {
    uuid,
    signed: action.payload.signed,
    signature: action.payload.signature,
  };
  try {
    yield put(messagesAction.claimMessagePending());
    yield put(messagesAction.setClaimMessageUuid(uuid));
    yield put(messagesAction.setClaimMessageSigned(message.signed));
    yield put(messagesAction.setClaimMessageSignature(message.signature));
    yield call(api.claimMessage, currentAccount!.auth, message);
    yield put(messagesAction.claimMessageSuccess());
  } catch (e) {
    console.log(e);
    yield put(messagesAction.claimMessageFailure());
  }
}

