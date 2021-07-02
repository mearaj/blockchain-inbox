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
import {manageAccounts} from 'store/Accounts/thunk';

interface AppProps {}

const Pages = (props: AppProps) => {
  const classes = useStyles();

  const handleKeplrAccountChange = () => {
    console.log("handleKeplrAccountChange, Key store in Keplr is changed. You may need to refetch the account info.");
  }

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", handleKeplrAccountChange);
    return () => window.removeEventListener("keplr_keystorechange", handleKeplrAccountChange);
  });

  const accountState = useSelector((state: AppState) => state.accountState);
  const accounts = useSelector((state:AppState) => state.accountsState);
  const dispatch = useDispatch();
  const {isLoggedIn} = accountState;
  const location = useLocation();

  const handleChainChanged = useCallback((_chainId) => {
    window.location.reload();
  }, []);
  useEffect(()=> {
    console.log(accounts);
    console.log(accountState);
  }, [location]);

  useEffect(() => {
    const timerId = setTimeout(()=> {
      console.log("managed accounts in useEffect called");
      dispatch(manageAccounts());
    }, 0);
    return ()=> clearTimeout(timerId);
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
  }, [])


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
    <Route exact path={"/account"} component={AccountPage} />
    <Route exact path={"/compose"} component={ComposePage}/>
    <Route exact path={"/sent"} component={SentPage}/>
    <Route exact path={"/inbox"} component={InboxPage}/>
    <Route exact path={"/outbox"} component={OutboxPage}/>
  </Switch>)
  if (!window.keplr && !window.ethereum) {
    currentView = <SelectExtensionPage/>
  } else if (!isLoggedIn) {
     currentView = <AccountPage/>
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
