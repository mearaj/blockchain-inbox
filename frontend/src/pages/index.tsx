import React, {ReactElement, useCallback, useEffect} from 'react';
import Sidebar from 'components/Sidebar';
import InboxPage from 'pages/Inbox';

import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import useStyles from './styles';
import SelectExtensionPage from 'pages/SelectExtension';
import ComposePage from 'pages/Compose';
import SentPage from 'pages/Sent';
import AccountPage from 'pages/Account';
import OutboxPage from 'pages/Outbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {manageAccounts, manageAccountsFromMetaMask} from 'store/Account/thunk';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {loaderActions} from 'store/Loader';

interface AppProps {
}

const Pages = (props: AppProps) => {
  const classes = useStyles();

  const handleKeplrAccountChange = () => {
    console.log("handleKeplrAccountChange, Key store in Keplr is changed. You may need to refetch the account info.");
  }

  const accountState = useSelector((state: AppState) => state.accountsState);
  const metamaskState = useSelector((state: AppState) => state.metamaskState);
  const loaderState = useSelector((state: AppState) => state.loaderState);
  const {accounts, currentAccount} = accountState;
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = accounts[currentAccount]?.isLoggedIn;

  const handleChainChanged = useCallback((_chainId) => {
    window.location.reload();
  }, []);

  const onMetamaskAccountsChanged =  (accounts:string[]) => {
    //window.location.reload();
    dispatch(manageAccountsFromMetaMask());
  };

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", handleKeplrAccountChange);
    return () => window.removeEventListener("keplr_keystorechange", handleKeplrAccountChange);
  });

  useEffect(() => {
    const timerId = setTimeout( ()=> {
      if (metamaskState.provider) {
        (metamaskState.provider).on('accountsChanged', onMetamaskAccountsChanged);
      }
    }, );
    return ()=> clearTimeout(timerId);
  },[metamaskState]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log("managed accounts in useEffect called");
      dispatch(manageAccounts());
    }, 0);
    return () => clearTimeout(timerId);
  }, [dispatch]);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      // const cosmJS = new SigningCosmosClient(
      //   "https://lcd-cosmoshub.keplr.app",
      //   accounts[0].address,
      //   offlineSigner,
      // );
      // const result = await window.keplr.signDirect(
      //   chainId,
      //   accounts[0].address,
      //   {
      //     bodyBytes: new Uint8Array(0),
      //     chainId,
      //   }
      // );
      return () => clearTimeout(timerId);
    }, 0)
  }, []);



  const loginWithMetamask = () => {
    // if (metamaskState.provider) {
    //   metamaskState.provider
    //     .request({
    //       method: 'eth_getEncryptionPublicKey',
    //       params: [accounts[0]], // you must have access to the specified account
    //     })
    //     .then((result: string) => {
    //       console.log(result)
    //     })
    //     .catch((error: { code: number }) => {
    //       if (error.code===4001) {
    //         // EIP-1193 userRejectedRequest error
    //         console.log("We can't encrypt anything without the key.");
    //       } else {
    //         console.error(error);
    //       }
    //     });
    // }
  };

  let currentView: ReactElement = (<Switch>
    <Route exact path={"/"}><Redirect to="/inbox"/></Route>
    <Route exact path={"/account"} component={AccountPage}/>
    <Route exact path={"/compose"} component={() => isLoggedIn ? <ComposePage/>:<Redirect to="/account"/>}/>
    <Route exact path={"/sent"} component={() => isLoggedIn ? <SentPage/>:<Redirect to="/account"/>}/>
    <Route exact path={"/inbox"} component={() => isLoggedIn ? <InboxPage/>:<Redirect to="/account"/>}/>
    <Route exact path={"/outbox"} component={() => isLoggedIn ? <OutboxPage/>:<Redirect to="/account"/>}/>
  </Switch>)
  if (!window.keplr && !window.ethereum) {
    currentView = <SelectExtensionPage/>
  }
  return (
    <div className={classes.root}>
      <Sidebar/>
      <main className={classes.content}>
        {currentView}
      </main>
      <Backdrop onClick={()=> dispatch(loaderActions.hideLoader())} open={loaderState.show} style={{zIndex: 10000}}>
        <CircularProgress/>
      </Backdrop>
    </div>
  );
}


export default Pages;
