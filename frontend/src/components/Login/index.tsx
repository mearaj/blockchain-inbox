import React, {useState} from 'react';
import copy from 'copy-to-clipboard';
import elliptic from 'elliptic';
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
import {Wallet} from 'ethers';
import CryptoJS from 'crypto-js';
import {allChains, isChainSupported} from 'chains';
import {loaderActions} from 'store/Loader';
import {accountsActions} from 'store/Account';
import {genPublicKeyFromPrivateKey, isPrivateKeyFormatValid, isValidHex} from 'chains/validators';

const Login: React.FC = () => {
  const classes = useStyles();
  const DEFAULT_SELECT_CHAIN_VALUE = "Select";
  const ID_ACCOUNT_PRIVATE_KEY = "ID_ACCOUNT_PRIVATE_KEY";
  const ID_ACCOUNT_PUBLIC_KEY = "ID_ACCOUNT_PUBLIC_KEY";
  const [chainName, setChainName] = useState(DEFAULT_SELECT_CHAIN_VALUE);
  const [chainNameErr, setChainNameErr] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKeyErr, setPrivateKeyErr] = useState("");
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const dispatch = useDispatch();
  const {currentAccount} = accountsState;
  //const dispatch = useDispatch()


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

  const signTokenForEthChain = async (token: string) => {
    try {
      const wallet = new Wallet(privateKey);
      const signature = await wallet.signMessage(token);
      console.log(signature);
      return signature;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  const signTokenForBlzChain = (token: string) => {
    const secp256k1 = new elliptic.ec("secp256k1");
    const key = secp256k1.keyFromPrivate(privateKey);
    const hash = CryptoJS.SHA256(
      CryptoJS.lib.WordArray.create(token as any)
    ).toString();

    const signature = key.sign(hash, {
      canonical: true,
    });
    return Buffer.from(new Uint8Array(
      signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32))
    )).toString('hex');
  }

  const clearForm = () => {
    setPrivateKey("");
    setChainName(DEFAULT_SELECT_CHAIN_VALUE);
    setPublicKey("");
    setChainNameErr("");
    setPrivateKeyErr("");
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loaderActions.showLoader());
    if (!chainName || chainName===DEFAULT_SELECT_CHAIN_VALUE) {
      setChainNameErr("Please select the chain name to Log In...");
      dispatch(loaderActions.hideLoader());
      return
    }

    const chainInfo = getChain(chainName);
    if (chainInfo) {
      const {isValid: isPrivateKeyValid} = isPrivateKeyFormatValid(privateKey, chainName);
      console.log(isPrivateKeyValid);
      if (isPrivateKeyValid) {
        const {isValid, error, publicKey} = genPublicKeyFromPrivateKey(privateKey, chainName);
        if (!isValid) {
          setPrivateKeyErr(error);
        } else {
          setPrivateKeyErr("");
          setPublicKey(publicKey);
          dispatch(accountsActions.login({chainName, publicKey, privateKey}));
        }
      } else {
        setPrivateKeyErr("Invalid Private Key!Please enter a valid private key!");
      }
    }
    dispatch(loaderActions.hideLoader());
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
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
                      variant="outlined"
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
                    //variant="outlined"
                    value={chainName}
                    onChange={handleChainNameChange}
                    id="chainName"
                    placeholder={"Hello"}
                    defaultValue={DEFAULT_SELECT_CHAIN_VALUE}
                    //style={{width: '100%'}}
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
    </div>
  );
}

export default Login;
