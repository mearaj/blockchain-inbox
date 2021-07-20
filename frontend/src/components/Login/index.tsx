import React, {useEffect, useState} from 'react';
import copy from 'copy-to-clipboard';
import useStyles from 'components/Login/styles';
import {
  Accordion,
  AccordionDetails,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import {accountsActions} from 'store/Account';
import {allChains, isChainSupported} from 'chains/common';
import {genPublicKeyFromPrivateKey} from 'chains/common/getPubKeyFromPvtKey';
import {isPrivateKeyFormatValid} from 'chains/common/isPrivateKeyFormatValid';
import {isValidHex} from 'chains/common/isValidHex';
import {BrowserRouterProps} from 'react-router-dom';
import clsx from 'clsx';

export interface LoginProps extends BrowserRouterProps {
  className?: string;
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}


const DEFAULT_SELECT_CHAIN_VALUE = "Select";
const ID_ACCOUNT_PRIVATE_KEY = "ID_ACCOUNT_PRIVATE_KEY";
const ID_ACCOUNT_PUBLIC_KEY = "ID_ACCOUNT_PUBLIC_KEY";

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const {className, expanded, onChange, ...otherProps} = props;
  const [locallyExpanded, setLocallyExpanded] = useState(expanded===undefined ? false:expanded);
  const classes = useStyles();
  const [chainName, setChainName] = useState(DEFAULT_SELECT_CHAIN_VALUE);
  const [chainNameErr, setChainNameErr] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKeyErr, setPrivateKeyErr] = useState("");
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const dispatch = useDispatch();
  const {currentAccount} = accountsState;
  //const dispatch = useDispatch()


  const handleAccordionChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    if (onChange!==undefined && expanded!==undefined) {
      onChange(event, isExpanded);
    } else {
      setLocallyExpanded(isExpanded);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ID = event.target.id;
    const value = event.target.value;
    switch (ID) {
      case ID_ACCOUNT_PRIVATE_KEY:
        if (isValidHex(value) || !value) {
          setPrivateKey(value);
        }
        const validatorResponse = isPrivateKeyFormatValid(value, chainName)
        if (validatorResponse.isValid) {
          if (privateKeyErr) {
            setPrivateKeyErr("");
          }
          const {publicKey, isValid} = genPublicKeyFromPrivateKey(value, chainName);
          if (isValid) {
            setPublicKey(publicKey);
          } else {
            setPublicKey("");
          }
        } else {
          setPublicKey("");
        }
        if (privateKeyErr && isPrivateKeyFormatValid(value, chainName)) {
          setPrivateKeyErr("");
        }
        break;
    }
  }

  const handleChainNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const chainName = event.target.value as string;
    setChainName(chainName);
    if (chainNameErr) {
      setChainNameErr("");
    }
    const {publicKey, isValid} = genPublicKeyFromPrivateKey(privateKey, chainName);
    if (isValid) {
      setPublicKey(publicKey);
    } else {
      setPublicKey("");
    }
  };


  const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);

  const clearForm = () => {
    setPrivateKey("");
    setChainName(DEFAULT_SELECT_CHAIN_VALUE);
    setPublicKey("");
    setChainNameErr("");
    setPrivateKeyErr("");
  }

  useEffect(() => {
    setLocallyExpanded(!!expanded);
  }, [expanded]);

  useEffect(() => {
    clearForm();
  }, [accountsState]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!chainName || chainName===DEFAULT_SELECT_CHAIN_VALUE) {
      setChainNameErr("Please select the chain name to Log In...");
      return
    }

    const chainInfo = getChain(chainName);
    if (chainInfo) {
      const {isValid: isPrivateKeyValid} = isPrivateKeyFormatValid(privateKey, chainName);
      if (isPrivateKeyValid) {
        const {isValid, error, publicKey} = genPublicKeyFromPrivateKey(privateKey, chainName);
        if (!isValid) {
          setPrivateKeyErr(error);
        } else {
          setPrivateKeyErr("");
          setPublicKey(publicKey);
          await dispatch(accountsActions.login({chainName, publicKey, privateKey}));
        }
      } else {
        setPrivateKeyErr("Invalid Private Key!Please enter a valid private key!");
      }
    }
  };


  return (

    <Accordion
      expanded={locallyExpanded}
      onChange={handleAccordionChange}
      className={clsx(classes.root, className)} {...otherProps}>
      <CommonAccordionHeader>
        Login
      </CommonAccordionHeader>
      <AccordionDetails className={classes.accordionDetails}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <div className={classes.formControlContainer}>
              <TextField
                label="Enter Your Private Key*"
                fullWidth={true}
                onChange={handleChange}
                value={privateKey}
                id={ID_ACCOUNT_PRIVATE_KEY}
                placeholder="Example 3d9f32.... (64 hex chars)"
                error={!!privateKeyErr}
                helperText={privateKeyErr}
              />
            </div>
            {
              publicKey &&
              <div className={classes.formControlContainer}>
                <FormControl fullWidth onClick={() => copy(publicKey)}>
                  <Button
                    className={classes.copyToClipboard}
                    fullWidth={false}
                    color="secondary"
                    variant="contained"
                  >
                    Copy to Clipboard
                  </Button>
                  <TextField
                    label="You Public Key"
                    fullWidth={true}
                    disabled
                    multiline
                    value={publicKey}
                    id={ID_ACCOUNT_PUBLIC_KEY}
                  />
                </FormControl>
              </div>
            }
            <div className={classes.formControlContainer}>
              <FormControl fullWidth error={!!chainNameErr}>
                <InputLabel id="chainNameLabel">
                  Select Your Chain&nbsp;*
                </InputLabel>
                <Select
                  fullWidth={true}
                  value={chainName}
                  onChange={handleChainNameChange}
                  id="chainName"
                  defaultValue={DEFAULT_SELECT_CHAIN_VALUE}
                  labelId="chainNameLabel"
                >
                  {
                    chainName===DEFAULT_SELECT_CHAIN_VALUE &&
                    <MenuItem value={DEFAULT_SELECT_CHAIN_VALUE} key={DEFAULT_SELECT_CHAIN_VALUE}>
                      {DEFAULT_SELECT_CHAIN_VALUE}
                    </MenuItem>
                  }
                  {
                    allChains.map((chain) => (
                      <MenuItem disabled={!isChainSupported(chain.chain)} value={chain.name} key={chain.name}>
                        {chain.name}
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>{chainNameErr}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type="reset"
              variant="contained"
              onClick={clearForm}
              color="secondary"
            >
              Clear
            </Button>
            <Button
              type="submit"
              style={{marginLeft: 24}}
              variant="contained"
              className={classes.loginButton}
              color="inherit"
            >
              Login
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default Login;
