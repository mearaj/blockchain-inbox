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
import {allChains, getPrivateKeysFromMnemonic, isChainSupported} from 'chains/common';
import clsx from 'clsx';
import {genPublicKeyFromPrivateKey, isPrivateKeyFormatValid} from 'chains/common/helper';
import {accountsActions} from 'store/Account/reducers';
import {ID_ACCOUNT_PRIVATE_KEY, ID_ACCOUNT_PUBLIC_KEY, LoginProps} from 'components/Login/interfaces';
import {ethChains} from 'chains';


const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const {className, expanded, onChange, ...otherProps} = props;
  const [locallyExpanded, setLocallyExpanded] = useState(expanded===undefined ? false:expanded);
  const classes = useStyles();
  const [chainName, setChainName] = useState(ethChains[0].name);
  const [chainNameErr, setChainNameErr] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKeyErr, setPrivateKeyErr] = useState("");
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts} = accountsState;
  const dispatch = useDispatch();


  const handleAccordionChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    if (onChange!==undefined && expanded!==undefined) {
      onChange(event, isExpanded);
    } else {
      setLocallyExpanded(isExpanded);
    }
  };

  const clearError = () => {
    setChainNameErr("");
    setPrivateKeyErr("");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(event.target.value);
    clearError();
  }

  const handleChainNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const chainName = event.target.value as string;
    setChainName(chainName);
    if (chainNameErr) {
      setChainNameErr("");
    }
    let isPrivateKey = privateKey.trim().split(" ").length===1;

    if (isPrivateKey) {
      const {publicKey, isValid} = genPublicKeyFromPrivateKey(privateKey, chainName);
      if (isValid) {
        setPublicKey(publicKey);
      } else {
        setPublicKey("");
      }
    }
  };


  const getChain = (chainName: string) => allChains.find((chain) => chain.name===chainName);

  const clearForm = () => {
    setPrivateKey("");
    setChainName(ethChains[0].name);
    setPublicKey("");
    setChainNameErr("");
    setPrivateKeyErr("");
  }

  useEffect(() => {
    setLocallyExpanded(!!expanded);
  }, [expanded]);

  useEffect(() => {
    clearForm();
  }, [accounts]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const chainInfo = getChain(chainName);
    if (chainInfo) {
      let isPrivateKey = privateKey.trim().split(' ').length===1;
      if (isPrivateKey) {
        const {isValid: isPrivateKeyValid} = isPrivateKeyFormatValid(privateKey, chainName);
        if (isPrivateKeyValid) {
          const {isValid, publicKey} = genPublicKeyFromPrivateKey(privateKey, chainName);
          if (!isValid) {
            setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
          } else {
            setPrivateKeyErr("");
            setPublicKey(publicKey);
            await dispatch(accountsActions.login({chainName, publicKey, privateKey}));
          }
        } else {
          setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
        }
      } else {
        // Assuming it's mnemonic
        try {
          const {privateKeys} = getPrivateKeysFromMnemonic(privateKey, chainName);
          const derivedPrivateKey: string = privateKeys[0];
          const {isValid: isPrivateKeyValid} = isPrivateKeyFormatValid(derivedPrivateKey, chainName);
          if (isPrivateKeyValid) {
            const {isValid, publicKey} = genPublicKeyFromPrivateKey(derivedPrivateKey, chainName);
            if (!isValid) {
              setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
            } else {
              setPrivateKeyErr("");
              setPublicKey(publicKey);
              await dispatch(accountsActions.login({chainName, publicKey, privateKey: derivedPrivateKey}));
            }
          } else {
            setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
          }
        } catch (e) {
          setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
        }
      }
    } else {
      setPrivateKeyErr("Invalid Private Key Or Mnemonic!");
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
                label="Enter Your Private Key or Mnemonic seed *"
                multiline
                fullWidth={true}
                onChange={handleChange}
                value={privateKey}
                id={ID_ACCOUNT_PRIVATE_KEY}
                placeholder="Enter Your Private Key or Mnemonic seed"
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
