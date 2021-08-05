import React, {useState} from 'react';
import {ComposeSliceForm} from 'pages/Compose/interfaces';
import {AllowedChainEnum, ethChains, getChainByName, isPublicKeyFormatValid} from 'chains';
import {HELPER_MSG_ETH_PUBLIC_KEY} from 'chains/eth/helper';
import {HELPER_MSG_BLUZELLE_PUBLIC_KEY} from 'chains/bluzelle/helper';

export type ComposeSliceFormChangeHandler = (valueType: 'publicKey' | 'chainName' | 'message') =>
  (event: React.ChangeEvent<HTMLInputElement>) => void;

export type ComposeSliceFormState = {
  composeSliceForm: ComposeSliceForm,
  handleChange: ComposeSliceFormChangeHandler,
  clearForm: () => void
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

  const validate = async () => {
    const {isValid} = isPublicKeyFormatValid(composeSliceForm.chainName, composeSliceForm.publicKey);
    if (!isValid) {
      const chainInfo = getChainByName(composeSliceForm.chainName);
      switch (chainInfo?.chain) {
        case AllowedChainEnum.ETH:
          setPublicKeyError(HELPER_MSG_ETH_PUBLIC_KEY);
          break;
        case AllowedChainEnum.Bluzelle:
          setPublicKeyError(HELPER_MSG_BLUZELLE_PUBLIC_KEY);
          break;
      }
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
  }
}
