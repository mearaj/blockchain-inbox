import {BLUZELLE_BACKEND_PUBLIC_ADDRESS, BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';
import {AminoSignResponse, MsgSend} from '@cosmjs/launchpad';
import {coin} from '@cosmjs/proto-signing';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';

export const useCuriumPayment = () => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;
  const dispatch = useDispatch();

  const handleCuriumPaymentApproval = async () => {
    let response: AminoSignResponse | undefined;
    await window.keplr?.enable(BLUZELLE_CHAIN_ID);
    const curiumAccount: Key | undefined = await window.keplr?.getKey(BLUZELLE_CHAIN_ID);
    const offlineSigner = await window.keplr?.getOfflineSigner(BLUZELLE_CHAIN_ID);
    const msg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: Buffer.from(curiumAccount!.bech32Address).toString('utf8'),
        to_address: BLUZELLE_BACKEND_PUBLIC_ADDRESS,
        amount: [coin(1000, "ubnt")],
      }
    };

    try {
      response = await offlineSigner!.signAmino(Buffer.from(curiumAccount!.bech32Address).toString('utf8'), {
        account_number: currentAccount?.publicKey || "",
        chain_id: BLUZELLE_CHAIN_ID,
        fee: {
          amount: [coin(1000, "ubnt")], gas: '1'
        },
        memo: 'This is for result 1',
        msgs: [msg],
        sequence: ''
      });
    } catch (e) {
      console.log(e);
    }
    if (response) {
      dispatch(messagesAction.curiumPaymentSuccess(response));
    } else {
      dispatch(messagesAction.curiumPaymentFailure());
    }
    return response;
  };
  return [handleCuriumPaymentApproval]
}
