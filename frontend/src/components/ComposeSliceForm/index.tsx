import React from 'react';
import useStyles from './styles';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import {allChains, isChainSupported} from 'chains';
import {ComposeSliceFormState} from 'hooks/useComposeSliceForm';
import {useSelector} from 'react-redux';
import {AppState} from 'store';

export const ComposeSliceForm: React.FC<ComposeSliceFormState> = (props) => {
  const classes = useStyles();
  const {publicKeyError, composeSliceForm, handleChange} = props;
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;

  return (
    <>
      <div className={classes.formControlContainer}>
        <TextField
          fullWidth={true}
          label="Enter Recipient's Public Key"
          onChange={handleChange('publicKey')}
          value={composeSliceForm.publicKey}
          id="publicKey"
          error={!!publicKeyError}
        />
        <FormHelperText error={!!publicKeyError}>
          {publicKeyError}
        </FormHelperText>
      </div>
      <div className={classes.formControlContainer}>
        <FormControl fullWidth>
          <InputLabel id="chainNameLabel">
            Select Recipient's Chain&nbsp;*
          </InputLabel>
          <Select
            fullWidth={true}
            value={composeSliceForm.chainName}
            onChange={handleChange('chainName')}
            labelId="chainNameLabel"
          >
            {
              allChains.map((chain) => (
                <MenuItem disabled={!isChainSupported(chain.chain)} value={chain.name} key={chain.name}>
                  {chain.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className={classes.formControlContainer}>
        <TextField
          fullWidth={true}
          label="My Public Key"
          disabled
          multiline={true}
          value={currentAccount?.publicKey || ""}
          variant="outlined"
        />
      </div>
      <div className={classes.formControlContainer}>
        <TextField
          fullWidth={true}
          label="My Chain Name"
          disabled
          multiline={true}
          value={currentAccount?.chainName}
          variant="outlined"
        />
      </div>
    </>
  )
}


export default ComposeSliceForm;

