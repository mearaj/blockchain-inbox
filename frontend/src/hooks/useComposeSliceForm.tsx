import React, {useState} from 'react';
import {ComposeSliceForm} from 'pages/Compose/interfaces';
import {ethChains, isPublicKeyFormatValid} from 'chains';

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
    const {isValid, error} = isPublicKeyFormatValid(composeSliceForm.chainName, composeSliceForm.publicKey);
    if (!isValid) {
      setPublicKeyError(error)
      return;
    }
    if (composeSliceForm.message.trim().replace(" ", "")==="") {
      setMessageError("A message cannot be empty!");
      return;
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
