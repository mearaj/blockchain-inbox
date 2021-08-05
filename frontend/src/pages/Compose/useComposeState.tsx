import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import React, {useCallback, useEffect, useState} from 'react';
import {AllowedChainEnum, getChainByName, getEncryptedMessageFromPublicKey, isPublicKeyFormatValid} from 'chains';
import {ComposeForm, MessageLeaseForm} from 'pages/Compose/interfaces';
import {useHistory} from 'react-router-dom';
import {BLUZELLE_BACKEND_PUBLIC_ADDRESS, BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';
import {AminoSignResponse, MsgSend} from '@cosmjs/launchpad';
import {coin} from '@cosmjs/proto-signing';
import {HELPER_MSG_ETH_PUBLIC_KEY} from 'chains/eth/helper';
import {HELPER_MSG_BLUZELLE_PUBLIC_KEY} from 'chains/bluzelle/helper';
import {loaderActions} from 'store/Loader';
import {LeaseFormChangeHandler, useLeaseForm} from 'hooks/useLeaseForm';
import {ComposeFormSliceChangeHandler, useComposeFormSlice} from 'hooks/useComposeFormSlice';

export type ComposeStateChangeHandler = LeaseFormChangeHandler & ComposeFormSliceChangeHandler;
export type ComposeStateErrors = {
  leaseFormError: string,
  publicKeyError: string,
  messageError: string,
}

export type ComposeState = {
  leaseForm: MessageLeaseForm,
  composeForm: ComposeForm,
  handleChange: ComposeStateChangeHandler,
  errors: ComposeStateErrors,
  clearForm: () => void,
  handleSubmit: (event: React.FormEvent) => void
}

export const useComposeState = (leaseFormInitial: MessageLeaseForm, composeFormInitial: ComposeForm): ComposeState => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;
  const [composeForm, handleComposeForm, clearComposeForm] = useComposeFormSlice(composeFormInitial);
  const [errors, setErrors] = useState<ComposeStateErrors>({
    leaseFormError: '',
    messageError: '',
    publicKeyError: ''
  });

  const [leaseForm, handleLeaseChange, clearLeaseForm] = useLeaseForm(leaseFormInitial);
  const curiumPaymentState = useSelector((state: AppState) => state.messagesState.curiumPaymentState);
  const dispatch = useDispatch();
  const history = useHistory();

  const clearErrors = () => {
    if (errors.publicKeyError || errors.messageError || errors.leaseFormError) {
      setErrors({leaseFormError: '', messageError: '', publicKeyError: ''});
    }
  }

  const handleChange: ComposeStateChangeHandler = (valueType: "seconds" | "minutes" | "hours" | "days" | "years" | "publicKey" | "chainName" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      clearErrors();
      switch (valueType) {
        case 'seconds':
        case  'minutes':
        case 'hours':
        case 'days':
        case 'years':
          handleLeaseChange(valueType)(event);
          break;
        case 'chainName':
        case 'message':
        case 'publicKey':
          handleComposeForm(valueType)(event);
          break;
      }
    }

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
    const {isValid} = isPublicKeyFormatValid(composeForm.chainName, composeForm.publicKey);
    if (!isValid) {
      const chainInfo = getChainByName(composeForm.chainName);
      switch (chainInfo?.chain) {
        case AllowedChainEnum.ETH:
          setErrors({...errors, publicKeyError: HELPER_MSG_ETH_PUBLIC_KEY});
          break;
        case AllowedChainEnum.Bluzelle:
          setErrors({...errors, publicKeyError: HELPER_MSG_BLUZELLE_PUBLIC_KEY});
          break;
      }
      return;
    }
    if (composeForm.message.trim().replace(" ", "")==="") {
      setErrors({...errors, messageError: "A message cannot be empty!"});
      return;
    }
    if (!leaseForm.seconds && !leaseForm.minutes && !leaseForm.hours && !leaseForm.days && !leaseForm.years) {
      setErrors({...errors, leaseFormError: "Lease Cannot Be Zero Or Empty!"});
      return;
    }

    const creatorValidator = await getEncryptedMessageFromPublicKey(
      currentAccount?.publicKey || "",
      currentAccount!.chainName,
      composeForm.message);
    const recipientValidator = await getEncryptedMessageFromPublicKey(
      composeForm.publicKey,
      composeForm.chainName,
      composeForm.message
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
          recipientChainName: composeForm.chainName,
          recipientPublicKey: composeForm.publicKey,
          timestamp: Date.now().valueOf(),
        })
      );
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
    composeForm,
    errors,
    handleChange,
    leaseForm,
    clearForm,
    handleSubmit,
  }
}


export default useComposeState;
