import {call, put, select} from 'redux-saga/effects';
import {AppState} from 'store/reducer';
import {AxiosResponse} from 'axios';
import {api, SentMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {bluzelleChain} from 'chains';
import {accountsActions} from 'store/Account/reducers';

export function* getSentSaga() {
  const appState: AppState = yield select();
  const currentAccount = appState.accountsState.currentAccount;
  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    try {
      yield put(messagesAction.getSentPending());
      const response: AxiosResponse = yield call(api.getSent, currentAccount!.auth);
      const result: SentMessage[] = response.data.sent;
      yield put(messagesAction.setSent(result));
      yield put(messagesAction.getSentSuccess());
    } catch (e) {
      if (e.error?.message.toLowerCase().includes("not authorized") ||
        e.message?.toLowerCase().includes("status code 401")) {
        yield put(accountsActions.logout(currentAccount));
      }
      yield put(messagesAction.setSent([]));
      yield put(messagesAction.getSentFailure());
    }
  }
}


