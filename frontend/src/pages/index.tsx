import React, {Dispatch, ReactElement, useCallback, useEffect} from 'react';
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
import {Accounts, accountsActions} from 'store/Accounts';
import {accountActions, AccountWallet} from 'store/Account';
import {curiumActions} from 'store/Curium';
import {AccountData} from 'secretjs/types/wallet';

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


  const curiumState = useSelector((state: AppState) => state.curiumState);
  const metamaskState = useSelector((state: AppState) => state.metamaskState);
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const dispatch = useDispatch<Dispatch<PayloadAction<any>>>();

  const {isLoggedIn} = accountsState;

  const handleChainChanged = useCallback((_chainId) => {
    window.location.reload();
  }, []);


  const manageAccountsFromMetaMask = (provider: any) => {
    if (provider) {
      window.ethereum
        .request({method: 'eth_accounts'})
        .then((accountsArr: string[]) => {
          let updatedAccounts: Accounts = {};
          accountsArr.forEach((accountAddress: string) => {
            if (accountsState[accountAddress]) {
              updatedAccounts[accountAddress] = accountsState[accountAddress]
            } else {
              updatedAccounts[accountAddress] = {
                wallet: AccountWallet.METAMASK_EXTENSION_WALLET,
                isLoggedIn: false,
                publicAddress: accountAddress,
                publicKey: ''
              };
            }
          });
          dispatch(accountsActions.updateAccounts(updatedAccounts));
        })
        .catch((err: Error) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          console.error(err);
        });
    }
  }

  useEffect(() => {
    const timerId = setTimeout(async () => {
      // this returns the provider, or null if it wasn't detected
      let provider = await detectEthereumProvider();
      let errMsg = "";
      let isProviderValid = !!provider;
      if (isProviderValid) {
        isProviderValid = provider===window.ethereum;
        if (!isProviderValid) {
          errMsg = "Please see that no other wallet is in conflict with Metamask";
        }
      } else {
        errMsg = 'Please install MetaMask!';
      }
      if (!isProviderValid) {
        provider = undefined;
      }
      dispatch(metamaskActions.updateState({provider, errMsg}));
      manageAccountsFromMetaMask(provider);
    }, 0);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (!window.keplr) {
        if (curiumState.provider) {
          dispatch(curiumActions.updateState({provider: undefined, msg: "Curium not installed!"}))
        }
        return
      }
      if (window.getOfflineSigner) {
        const chainId = "bluzelleTestNetPublic-22";
        try {
          await window.keplr.enable(chainId);
          const offlineSigner = window.getOfflineSigner(chainId);
          const accounts = await offlineSigner.getAccounts();
          console.log(accounts);
          let updatedAccounts: Accounts = {};
          accounts.forEach((accountData:AccountData) => {
            if (accountsState[accountData.address]) {
              updatedAccounts[accountData.address] = accountsState[accountData.address]
            } else {
              updatedAccounts[accountData.address] = {
                wallet: AccountWallet.CURIUM_EXTENSION_WALLET,
                isLoggedIn: false,
                publicAddress: accountData.address,
                publicKey: new TextDecoder().decode(accountData.pubkey),
              };
            }
          });
           dispatch(accountsActions.updateAccounts(updatedAccounts));
          // dispatch(accountActions.updateAccountState(updatedAccounts[accounts[0]]));
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
          // console.log(result);
        } catch (e) {
          console.log(e);
        }
      }
       return () => clearTimeout(timerId);
    }, 0)
  },[])


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

  useEffect(() => {

  })

  useEffect(() => {
    const timerId = setTimeout(async () => {

      return () => clearTimeout(timerId);
    });
  }, []);

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
