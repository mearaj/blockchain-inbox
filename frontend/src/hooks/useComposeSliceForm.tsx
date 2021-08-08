import React, {useState} from 'react';
import {ComposeSliceForm} from 'pages/Compose/interfaces';
import {ethChains, isPublicKeyFormatValid} from 'chains';
import {isMessageValid} from 'utils/helpers';

export type ComposeSliceFormChangeHandler = (valueType: 'publicKey' | 'chainName' | 'message') =>
  (event: React.ChangeEvent<HTMLInputElement>) => void;

export type ComposeSliceFormState = {
  composeSliceForm: ComposeSliceForm,
  handleChange: ComposeSliceFormChangeHandler,
  clearForm: () => void
  clearError: () => void,
  validate: () => void,
  publicKeyError: string,
  messageError: string,
}

/**
 * This hook manages the state of 'publicKey', 'chainName', 'message' of ComposePage.
 * This hook is reusable.
 * @param composeFormInitial
 */

export const useComposeSliceForm = (composeFormInitial: ComposeSliceForm): ComposeSliceFormState => {
  const [composeSliceForm, setComposeSliceForm] = useState<ComposeSliceForm>(composeFormInitial);
  const [publicKeyError, setPublicKeyError] = useState("");
  const [messageError, setMessageError] = useState("");

  const clearForm = () => {
    setComposeSliceForm({chainName: ethChains[0].name, message: '', publicKey: ''})
  }

  const clearError = () => {
    if (publicKeyError) {
      setPublicKeyError("");
    }
    if (messageError) {
      setMessageError("");
    }
  }

  const validate = () => {
    let isValid = isPublicKeyFormatValid(composeSliceForm.chainName, composeSliceForm.publicKey);
    if (!isValid.isValid) {
      setPublicKeyError(isValid.error)
      return;
    }
    isValid = isMessageValid(composeSliceForm.message)
    if (!isValid.isValid) {
      setMessageError(isValid.error);
    }
  };

  const handleChange = (valueType: 'publicKey' | 'chainName' | 'message') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    clearError();
    switch (valueType) {
      case 'publicKey':
        setComposeSliceForm({...composeSliceForm, publicKey: value});
        break;
      case 'message':
        setComposeSliceForm({...composeSliceForm, message: value});
        break;
      case 'chainName':
        setComposeSliceForm({...composeSliceForm, chainName: value});
        break;
    }
  }
  return {
    clearForm,
    composeSliceForm,
    handleChange,
    messageError,
    publicKeyError,
    validate,
    clearError,
  }
}
