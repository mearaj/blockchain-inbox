import React, {useState} from 'react';
import {ComposeForm} from 'pages/Compose/interfaces';
import {ethChains} from 'chains';

export type ComposeFormSliceChangeHandler = (valueType: 'publicKey' | 'chainName' | 'message') =>
  (event: React.ChangeEvent<HTMLInputElement>) => void;


export const useComposeFormSlice = (composeForm: ComposeForm):
  [composeForm: ComposeForm, composeFormChangeHandler: ComposeFormSliceChangeHandler, clearForm: () => void] => {
  const [compose, setCompose] = useState<ComposeForm>(composeForm);

  const clearForm = () => {
    setCompose({chainName: ethChains[0].name, message: '', publicKey: ''})
  }

  const handleChange = (valueType: 'publicKey' | 'chainName' | 'message') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    switch (valueType) {
      case 'publicKey':
        setCompose({...compose, publicKey: value});
        break;
      case 'message':
        setCompose({...compose, message: value});
        break;
      case 'chainName':
        setCompose({...compose, chainName: value});
        break;
    }
  }
  return [compose, handleChange, clearForm]
}
