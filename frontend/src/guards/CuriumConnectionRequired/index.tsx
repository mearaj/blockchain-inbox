import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import useStyles from './styles';
import CommonBar from 'components/CommonBar';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import {BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';
import {Button} from '@material-ui/core';


// This guard assumes the route is already protected with CuriumRequired and BluzelleAccountRequired
const CuriumConnectionRequired: React.FC<PropsWithChildren<any>> = (props) => {

  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [isEnabled, setIsEnabled] = useState(true);
  const [curiumAccount, setCuriumAccount] = useState<Key | undefined>(undefined);


  const checkAccount = async () => {
    try {
      const results: Key | undefined = await window.keplr?.getKey(BLUZELLE_CHAIN_ID);
      if (results) {
        const publicKey = Buffer.from(results.pubKey).toString('hex');
        if (publicKey===currentAccount?.publicKey) {
          setCuriumAccount(results);
        } else {
          setCuriumAccount(undefined);
        }
      } else {
        setCuriumAccount(undefined);
      }
    } catch (e) {
      setCuriumAccount(undefined);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(async () => {
      try {
        await window.keplr?.enable(BLUZELLE_CHAIN_ID);
        setIsEnabled(true);
        await checkAccount();
      } catch (e) {
        setIsEnabled(false);
      }
    },);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setInterval(async () => {
      try {
        await window.keplr?.enable(BLUZELLE_CHAIN_ID);
        if (!isEnabled) {
          setIsEnabled(true);
        }
        await checkAccount();
      } catch (e) {
        setIsEnabled(false);
      }
    },500);
    return () => clearInterval(timerId);
  }, []);

  const classes = useStyles();

  let msg: string = "";
  let msgHeader: string = "";
  let currentView: ReactElement | undefined;
  if (!isEnabled) {
    msgHeader = "Curium Disabled!";
    msg = "Kindly enable Curium Extension for this app...";
    currentView = <div className={classes.root}>
      <CommonBar>{msgHeader}</CommonBar>
      <div className={classes.helperText}>{msg}</div>
    </div>;
  } else {
    if (!curiumAccount) {
      msgHeader = "Curium Disconnected!";
      msg = "Kindly connect the Curium Extension with this app...";
      currentView = <div className={classes.root}>
        <CommonBar>{msgHeader}</CommonBar>
        <div className={classes.helperText}>{msg}</div>
        <Button onClick={checkAccount} color="primary" variant="contained">Click To Test Connection</Button>
      </div>
    } else {
      currentView = props.children;
    }
  }

  return (
    <>
      {currentView}
    </>
  )
}

export default CuriumConnectionRequired;
