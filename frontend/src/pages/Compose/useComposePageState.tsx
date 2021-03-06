import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import React, {useCallback} from 'react';
import {getEncryptedMessageFromPublicKey, isPublicKeyFormatValid} from 'chains';
import {ComposeSliceForm, MessageLeaseForm} from 'pages/Compose/interfaces';
import {LeaseFormState, useLeaseFormState} from 'hooks/useLeaseFormState';
import {ComposeSliceFormState, useComposeSliceForm} from 'hooks/useComposeSliceForm';
import {useCuriumPayment} from 'hooks/useCuriumPayment';
import {loaderActions} from 'store/Loader';
import {useHistory} from 'react-router-dom';
import {isLeaseFormValid, isMessageValid} from 'utils/helpers';
import {getLeaseFromLeaseForm} from 'utils/helpers/getLeaseFromLeaseForm';


export interface ComposeState {
  leaseFormState: LeaseFormState,
  composeSliceFormState: ComposeSliceFormState,
  handleSubmit: (event: React.FormEvent) => void,
  clearForm: () => void,
}

/**
 * The intent of this hook is to separate the state(logic) of the Compose Page, for better readability of Compose Page which
 * should mainly focus on UI
 */

export const useComposePageState = (leaseFormInitial: MessageLeaseForm, composeFormInitial: ComposeSliceForm): ComposeState => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;
  const [paymentHandler] = useCuriumPayment();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    composeSliceForm,
    handleChange: composeSliceFormChangeHandler,
    validate: validateComposeSliceFormState,
    clearForm: clearComposeForm,
    clearError: clearComposeFormError,
    publicKeyError,
    messageError
  } = useComposeSliceForm(composeFormInitial);
  const {
    leaseForm,
    clearForm: clearLeaseForm,
    handleChange: leaseFormChangeHandler,
    leaseFormError,
    validate: validateLeaseFormState,
    clearError: clearLeaseFromError,
  } = useLeaseFormState(leaseFormInitial);


  const validateForms = useCallback(() => {
    validateLeaseFormState();
    validateComposeSliceFormState();
  }, [validateComposeSliceFormState, validateLeaseFormState])

  const areFormsValid = () => {
    const isPublicKeyValid = isPublicKeyFormatValid(composeSliceForm.chainName, composeSliceForm.publicKey);
    const isMessageValidFormat = isMessageValid(composeSliceForm.message);
    const isLeaseValid = isLeaseFormValid(leaseForm);
    return isPublicKeyValid.isValid && isMessageValidFormat.isValid && isLeaseValid.isValid;
  }

  const handleCuriumPaymentApproval = useCallback(async () => {
    if (!leaseFormError && !publicKeyError && !messageError) {
      dispatch(loaderActions.showLoader());
      const response = await paymentHandler();
      if (response) {
        dispatch(messagesAction.claimMessage({
          signature: response.signature,
          signed: response.signed
        }));
      }
      dispatch(loaderActions.hideLoader());
      if (response) {
        history.push('/sent');
      }
    }

  }, [dispatch, history, leaseFormError, messageError, paymentHandler, publicKeyError]);

  const clearForm = useCallback(() => {
    clearComposeForm();
    clearLeaseForm();
  }, [clearComposeForm, clearLeaseForm]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validateForms();
    if (areFormsValid() && !leaseFormError && !publicKeyError && !messageError) {
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
            lease: getLeaseFromLeaseForm(leaseForm),
            creatorEncryptedMessage,
            recipientEncryptedMessage,
            recipientChainName: composeSliceForm.chainName,
            recipientPublicKey: composeSliceForm.publicKey,
            timestamp: Date.now().valueOf(),
          })
        );
        await handleCuriumPaymentApproval();
      }
    }
  };
  return {
    composeSliceFormState: {
      validate: validateComposeSliceFormState,
      clearForm: clearComposeForm,
      composeSliceForm,
      handleChange: composeSliceFormChangeHandler,
      publicKeyError,
      messageError,
      clearError: clearComposeFormError,
    },
    leaseFormState: {
      validate: validateLeaseFormState,
      clearForm: clearLeaseForm,
      leaseForm,
      handleChange: leaseFormChangeHandler,
      leaseFormError,
      clearError: clearLeaseFromError,
    },
    handleSubmit,
    clearForm
  }
}


export default useComposePageState;
