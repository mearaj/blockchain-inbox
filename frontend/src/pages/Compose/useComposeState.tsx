import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import React, {useCallback, useEffect} from 'react';
import {getEncryptedMessageFromPublicKey} from 'chains';
import {ComposeSliceForm, MessageLeaseForm} from 'pages/Compose/interfaces';
import {useHistory} from 'react-router-dom';
import {BLUZELLE_BACKEND_PUBLIC_ADDRESS, BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';
import {AminoSignResponse, MsgSend} from '@cosmjs/launchpad';
import {coin} from '@cosmjs/proto-signing';
import {loaderActions} from 'store/Loader';
import {LeaseFormState, useLeaseForm} from 'hooks/useLeaseForm';
import {ComposeSliceFormState, useComposeSliceForm} from 'hooks/useComposeSliceForm';


export interface ComposeState {
  leaseFormState: LeaseFormState,
  composeSliceFormState: ComposeSliceFormState,
  handleSubmit: (event: React.FormEvent) => void,
  clearForm: () => void,
}


export const useComposeState = (leaseFormInitial: MessageLeaseForm, composeFormInitial: ComposeSliceForm): ComposeState => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;
  const composeSliceFormState = useComposeSliceForm(composeFormInitial);
  const {
    composeSliceForm,
    validate: validateComposeSliceFormState,
    clearForm: clearComposeForm,
    publicKeyError,
    messageError
  } = composeSliceFormState;
  const leaseFormState = useLeaseForm(leaseFormInitial);
  const {
    leaseForm,
    clearForm: clearLeaseForm,
    leaseFormError,
    validate,
  } = leaseFormState;

  const curiumPaymentState = useSelector((state: AppState) => state.messagesState.curiumPaymentState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCuriumPaymentApproval = useCallback(async () => {
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
      const response: AminoSignResponse = await offlineSigner!.signAmino(Buffer.from(curiumAccount!.bech32Address).toString('utf8'), {
        account_number: currentAccount?.publicKey || "",
        chain_id: BLUZELLE_CHAIN_ID,
        fee: {
          amount: [coin(1000, "ubnt")], gas: '1'
        },
        memo: 'This is for result 1',
        msgs: [msg],
        sequence: ''
      });
      if (response) {
        dispatch(messagesAction.curiumPaymentSuccess(response));
      } else {
        dispatch(messagesAction.curiumPaymentFailure());
      }
    } catch (e) {
      dispatch(messagesAction.curiumPaymentFailure());
    }
  }, [currentAccount?.publicKey, dispatch]);

  const clearForm = useCallback(() => {
    clearComposeForm();
    clearLeaseForm();
  }, [clearComposeForm, clearLeaseForm]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validateComposeSliceFormState();
    validate();
    if (!leaseFormError && !publicKeyError && !messageError) {
      const creatorValidator = await getEncryptedMessageFromPublicKey(
        currentAccount?.publicKey || "",
        currentAccount!.chainName,
        composeSliceForm.message);
      const recipientValidator = await getEncryptedMessageFromPublicKey(
        composeSliceForm.publicKey,
        composeSliceForm.chainName,
        composeSliceForm.message
      );
      if (creatorValidator.isValid && recipientValidator.isValid) {
        const creatorEncryptedMessage = creatorValidator.encryptedMessage;
        const recipientEncryptedMessage = recipientValidator.encryptedMessage;
        dispatch(messagesAction.sendMessage({
            creatorChainName: currentAccount!.chainName,
            creatorPublicKey: currentAccount?.publicKey || "",
            lease: {
              seconds: leaseForm.seconds==="" ? 0:leaseForm.seconds,
              minutes: leaseForm.minutes==="" ? 0:leaseForm.minutes,
              hours: leaseForm.hours==="" ? 0:leaseForm.hours,
              days: leaseForm.days==="" ? 0:leaseForm.days,
              years: leaseForm.years==="" ? 0:leaseForm.years,
            },
            creatorEncryptedMessage,
            recipientEncryptedMessage,
            recipientChainName: composeSliceForm.chainName,
            recipientPublicKey: composeSliceForm.publicKey,
            timestamp: Date.now().valueOf(),
          })
        );
      }
    }
  };

  useEffect(() => {
    const timerId = setTimeout(async () => {
      switch (curiumPaymentState) {
        case messagesAction.curiumPaymentPending.type:
          dispatch(loaderActions.showLoader());
          await handleCuriumPaymentApproval();
          break;
        case messagesAction.curiumPaymentFailure.type:
          clearForm();
          dispatch(loaderActions.hideLoader());
          dispatch(messagesAction.clearCuriumPaymentState());
          break;
        case messagesAction.curiumPaymentSuccess.type:
          clearForm();
          dispatch(loaderActions.hideLoader());
          dispatch(messagesAction.clearCuriumPaymentState());
          history.push('/sent');
      }
    })
    return () => clearTimeout(timerId);
  }, [clearForm, curiumPaymentState, dispatch, handleCuriumPaymentApproval, history]);
  return {
    leaseFormState,
    composeSliceFormState,
    handleSubmit,
    clearForm,
  }
}


export default useComposeState;
