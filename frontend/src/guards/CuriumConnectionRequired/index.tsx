import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import useStyles from './styles';
import CommonBar from 'components/CommonBar';
import {useDispatch, useSelector} from 'react-redux';
import {accountsActions, AppState} from 'store';
import {BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';
import {Button} from '@material-ui/core';


// This guard assumes the route is already protected with CuriumRequired and BluzelleAccountRequired
const CuriumConnectionRequired: React.FC<PropsWithChildren<any>> = (props) => {

  const dispatch = useDispatch();
  const accountsState = useSelector((appState: AppState) => appState.accountsState)
  const {currentAccount, curiumAccount} = accountsState;
  const [isEnabled, setIsEnabled] = useState(true);

  const checkAccount = useCallback(async () => {
    try {
      const results: Key | undefined = await window.keplr?.getKey(BLUZELLE_CHAIN_ID);
      if (results) {
        const publicKey = Buffer.from(results.pubKey).toString('hex');
        const address = Buffer.from(results.address).toString('hex');
        dispatch(accountsActions.setCuriumAccount({
          address: address,
          algo: results.algo,
          bech32Address: results.bech32Address,
          name: results.name,
          pubKey: publicKey,
        }));
      } else {
        dispatch(accountsActions.setCuriumAccount(undefined));
      }
    } catch (e) {
      dispatch(accountsActions.setCuriumAccount(undefined));
    }
  }, [dispatch]);

  const requestEnablePermission = async () => {
    try {
      await window.keplr?.enable(BLUZELLE_CHAIN_ID);
      setIsEnabled(true);
    } catch (e) {
      setIsEnabled(false);
    }
  }


  useEffect(() => {
    const timerId = setTimeout(async () => {
      await requestEnablePermission();
      await checkAccount();
    },);
    return () => clearTimeout(timerId);
  }, [currentAccount, checkAccount]);

  const classes = useStyles();

  const getErrorMsgTitle = (): string => {
    if (!isEnabled) {
      return "Curium Disabled"
    }
    if (!curiumAccount) {
      return "Curium Disconnected!";
    }
    const publicKey = Buffer.from(curiumAccount.pubKey).toString('hex');
    if (publicKey!==currentAccount!.publicKey) {
      return "Account Mismatch!"
    }
    return "";
  }

  const getErrorMsg = (): string => {
    if (!isEnabled) {
      return "Curium is disabled, kindly click below to enable it.\n" +
        "Please see that your active Bluzelle account matches Curium"
    }
    if (!curiumAccount) {
      return "Please see that you are connected to Curium Extension!";
    }
    if (curiumAccount.pubKey!==currentAccount!.publicKey) {
      return "Please see that your active Bluzelle account matches Curium";
    }
    return "";
  }

  const isValid = (): boolean => {
    if (!curiumAccount || !isEnabled) {
      return false;
    }
    return curiumAccount.pubKey===currentAccount!.publicKey;
  }

  return (
    <>
      {
        isValid() ? props.children:
          <div className={classes.root}>
            <CommonBar>{getErrorMsgTitle()}</CommonBar>
            <div className={classes.helperText}>{getErrorMsg()}</div>
            {
              !isEnabled &&
              <Button onClick={requestEnablePermission} color="primary" variant="contained">Enable Curium</Button>
            }
          </div>

      }
    </>
  )
}

export default CuriumConnectionRequired;
