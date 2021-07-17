import React, {useState} from 'react';
import copy from 'copy-to-clipboard';
import elliptic from 'elliptic';
import useStyles from 'pages/Login/styles';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonCardHeader from 'components/CommonCardHeader';
import clsx from 'clsx';
import {Wallet} from 'ethers';
import CryptoJS from 'crypto-js';
import {allChains, isChainSupported} from 'chains';
import {loaderActions} from 'store/Loader';
import {login, requestLoginToken} from 'api';
import {accountsActions} from 'store/Account';
import CommonBar from 'components/CommonBar';

const Login: React.FC = () => {
  const classes = useStyles();
  const DEFAULT_SELECT_CHAIN_VALUE = "Select";
  const ID_ACCOUNT_PRIVATE_KEY = "ID_ACCOUNT_PRIVATE_KEY";
  const ID_ACCOUNT_PUBLIC_KEY = "ID_ACCOUNT_PUBLIC_KEY";
  const [textFieldFocused, setTextFieldFocused] = useState(false);
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
        if (isPrivateKeyFormatValid(value, chainName)) {
          if (privateKeyErr) {
            setPrivateKeyErr("");
          }
          const {publicKey, isValid} = genPublicKeyFromPrivateKey(value, chainName);
          if (isValid) {
            setPublicKey(publicKey);
          } else {
            setPublicKey("");
          }
        }
        if (privateKeyErr && isPrivateKeyFormatValid(value, chainName)) {
          setPrivateKeyErr("");
        }
        break;
    }
  }

  const isValidHex = (hexString: string) => {
    return /^([A-Fa-f0-9]+)$/.test(hexString);
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


  // useEffect(() => {
  //   dispatch(composeActions.setTo(to));
  //   dispatch(composeActions.setFrom(from));
  // },[dispatch, from, to])

  const getChainShortInfo = (chainName: string) => allChains.find((chain) => chain.name===chainName);

  const isPrivateKeyFormatValid = (privateKey: string, chainName: string): { error: string, isValid: boolean } => {
    const chainInfo = getChainShortInfo(chainName);
    if (!chainInfo) {
      return {error: "Chain Info is not provided", isValid: false};
    }
    let isValid: boolean = false;
    let error: string = "Invalid Private Key";
    switch (chainInfo.chain) {
      case "ETH":
        isValid = /^[A-Fa-f0-9]{64}$/.test(privateKey);
        if (!isValid) {
          error = "Invalid Private Key!"
          break;
        }
        isValid = true;
        error = "";
        break;
      case "Bluzelle":
        isValid = /^[A-Fa-f0-9]{64}$/.test(privateKey);
        if (!isValid) {
          error = "Invalid Private Key!"
          break;
        }
        isValid = true;
        error = "";
        break;
    }

    return {error, isValid};
  }

  // This method assumes the format of private key is valid hex
  const genPublicKeyFromPrivateKey = (privateKey: string, chainName: string): { error: string, isValid: boolean, publicKey: string } => {
    const chainInfo = getChainShortInfo(chainName);
    if (!chainInfo) {
      return {error: "Chain Info is not provided", isValid: false, publicKey: ""};
    }
    let isValid: boolean = false;
    let error: string = "Invalid Private Key";
    let publicKey: string = "";
    switch (chainInfo.chain) {
      case "ETH":
        try {
          const wallet = new Wallet(privateKey);
          publicKey = wallet.publicKey;
          console.log("Public key is", publicKey);
          error = "";
          isValid = true;
        } catch (e) {
          console.log(e);
          error = "Invalid Private Key";
          isValid = false;
          publicKey = "";
        }
        break;
      case "Bluzelle":
        try {
          const secp256k1 = new elliptic.ec("secp256k1");
          const key = secp256k1.keyFromPrivate(privateKey, 'hex');
          publicKey = key.getPublic().encode('hex', true);
          error = "";
          isValid = true;
        } catch (e) {
          error = "Invalid Private Key";
          isValid = false;
          publicKey = "";
        }
        isValid = true;
        error = "";
        break;
    }
    console.log({error, isValid, publicKey})

    return {error, isValid, publicKey};
  }

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
    const chainInfo = getChainShortInfo(chainName);
    if (chainInfo) {
      const isPrivateKeyValid = isPrivateKeyFormatValid(privateKey, chainName);
      if (isPrivateKeyValid.isValid) {
        const {isValid, error, publicKey} = genPublicKeyFromPrivateKey(privateKey, chainName);
        if (!isValid) {
          setPrivateKeyErr(error);
        } else {
          setPrivateKeyErr("");
          setPublicKey(publicKey);
          try {
            const token = (await requestLoginToken({chainName, publicKey})).token;
            let signature: string;
            let auth: any;
            switch (chainInfo.chain) {
              case "ETH":
                signature = await signTokenForEthChain(token);
                auth = (await login({chainName, publicKey, signature, token})).auth;
                dispatch(accountsActions.setAccountState({
                  accountState: {
                    publicKey,
                    privateKey,
                    chainName,
                    auth
                  }
                }));
                if (!currentAccount) {
                  dispatch(accountsActions.setCurrentAccount({
                    publicKey,
                    privateKey,
                    chainName,
                    auth
                  }))
                }
                break;
              case "Bluzelle":
                signature = signTokenForBlzChain(token);
                auth = await login({chainName, publicKey, signature, token});
                auth = (await login({chainName, publicKey, signature, token})).auth;
                dispatch(accountsActions.setAccountState({
                  accountState: {
                    publicKey,
                    privateKey,
                    chainName,
                    auth
                  }
                }))
                if (!currentAccount) {
                  dispatch(accountsActions.setCurrentAccount({
                    publicKey,
                    privateKey,
                    chainName,
                    auth
                  }))
                }
                console.log(auth);
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        setPrivateKeyErr("Invalid Private Key!Please enter a valid private key!");
      }
    }
    dispatch(loaderActions.hideLoader());
  };

  return (
    <div className={classes.root}>
      <CommonBar>Login</CommonBar>
      <Card>
        <CommonCardHeader>Login</CommonCardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth>
                <FormLabel
                  className={clsx(textFieldFocused ? classes.focused:"")}
                  htmlFor={ID_ACCOUNT_PRIVATE_KEY}
                >
                  Enter Your Private Key
                </FormLabel>
                <TextField
                  fullWidth={true}
                  onChange={handleChange}
                  value={privateKey}
                  id={ID_ACCOUNT_PRIVATE_KEY}
                  onFocus={() => setTextFieldFocused(true)}
                  onBlur={() => setTextFieldFocused(false)}
                  placeholder="Example 0x3d932...."
                  variant="outlined"
                  error={!!privateKeyErr}
                  helperText={privateKeyErr}
                />
              </FormControl>
              {
                publicKey &&
                <FormControl fullWidth onClick={() => copy(publicKey)}>
                  <FormLabel htmlFor={ID_ACCOUNT_PUBLIC_KEY}>
                    You Public Key&nbsp;&nbsp;&nbsp;
                    <Button
                      color="secondary"
                      variant="contained"
                    >
                      Copy to Clipboard
                    </Button>
                  </FormLabel>
                  <TextField
                    fullWidth={true}
                    disabled
                    multiline
                    value={publicKey}
                    id={ID_ACCOUNT_PUBLIC_KEY}
                    variant="outlined"
                  />
                </FormControl>
              }
              <FormControl fullWidth error={!!chainNameErr}>
                <FormLabel id="chainNameLabel">
                  Select Your Chain&nbsp;*
                </FormLabel>
                <Select
                  fullWidth={true}
                  variant="outlined"
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
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                type="reset"
                variant="contained"
                color={'primary'}
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button
                type="submit"
                style={{marginLeft: 24}}
                variant="contained"
                color={'primary'}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
