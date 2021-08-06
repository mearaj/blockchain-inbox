// import {AminoSignResponse} from '@cosmjs/launchpad';
// import {messagesAction} from 'store/Messages/reducers';
// import {put, select} from 'redux-saga/effects';
// import {AppState} from 'store/reducer';
// export function* curiumPaymentProcessSage() {
//   if (window.keplr) {
//     const curiumPaymentState: string = yield select((appState: AppState) => appState.messagesState.curiumPaymentState);
//     switch (curiumPaymentState) {
//       case messagesAction.curiumPaymentSuccess.type:
//         const result: AminoSignResponse = yield select((appState: AppState) => appState.messagesState.curiumPaymentResponse);
//         yield put(messagesAction.claimMessage({
//           signature: result.signature,
//           signed: result.signed
//         }));
//         break;
//       case messagesAction.curiumPaymentFailure.type:
//         yield put(messagesAction.deleteOutboxMessage());
//     }
//   }
// }

export {};
