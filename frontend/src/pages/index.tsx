import React, {Dispatch, ReactElement, useEffect} from 'react';
import Sidebar from 'components/Sidebar';
import InboxPage from 'pages/Inbox';

import {Redirect, Route, Switch} from 'react-router-dom';
import useStyles from './styles';
import SelectExtensionPage from 'pages/SelectExtension';
import ComposePage from 'pages/Compose';
import SentPage from 'pages/Sent';
import AccountPage from 'pages/Account';
import OutboxPage from 'pages/Outbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {PayloadAction} from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';
import {metamaskActions} from 'store/Metamask';
import LoginExtensionPage from 'pages/LoginExtension';

declare var window: Window & any;

interface AppProps {
}

const Pages = (props: AppProps) => {
  const classes = useStyles();

  const handleKeplrAccountChange = () => {
    console.log("handleKeplrAccountChange, Key store in Keplr is changed. You may need to refetch the account info.");
  }

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", handleKeplrAccountChange);
    return () => window.removeEventListener("keplr_keystorechange", handleKeplrAccountChange);
  });



  const metamaskState = useSelector((state: AppState) => state.metamaskState);
  const dispatch = useDispatch<Dispatch<PayloadAction<any>>>();

  const {isRegistered, isLoggedIn} = useSelector((state: AppState) => state.accountState);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      // this returns the provider, or null if it wasn't detected
      const provider = await detectEthereumProvider();
      let errMsg = "";
      if (provider) {
        if (provider!==window.ethereum) {
          errMsg = "Please see that no other wallet is in conflict with Metamask";
        }
      } else {
        errMsg = 'Please install MetaMask!';
      }
      dispatch(metamaskActions.updateState({provider, errMsg}));
    }, 0);
    return clearTimeout(timerId);
  }, []);


  useEffect(()=> {

  });

  let currentView: ReactElement = (<Switch>
    <Route exact path={"/"}><Redirect to="/inbox"/></Route>
    <Route exact path={"/account"} component={() => <AccountPage/>}/>
    <Route exact path={"/compose"} component={() => <ComposePage/>}/>
    <Route exact path={"/sent"} component={() => <SentPage/>}/>
    <Route exact path={"/inbox"} component={InboxPage}/>
    <Route exact path={"/outbox"} component={OutboxPage}/>
  </Switch>)
  if (!window.keplr && !window.ethereum) {
    currentView = <SelectExtensionPage/>
  } else if (!isLoggedIn) {
    currentView = <LoginExtensionPage/>
  }
  return (
    <div className={classes.root}>
      <Sidebar/>
      <main className={classes.content}>
        {currentView}
      </main>
    </div>
  );
}


export default Pages;
