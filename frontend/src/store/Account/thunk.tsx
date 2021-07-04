import detectEthereumProvider from '@metamask/detect-provider';
import {Dispatch} from 'redux';
import {Accounts, accountsActions} from 'store/Account/index';
import {AccountWallet} from 'store/Account/account';
import {AppState} from 'store/index';
import {curiumActions} from 'store/Curium';
import {AccountData} from 'secretjs/types/wallet';
import {metamaskActions} from 'store/Metamask';
import {requestLoginToken} from 'api';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';

export const manageAccountsFromCurium = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const appState = getState();
  const curiumState = appState.curiumState;
  if (!window.keplr) {
    if (curiumState.provider) {
      dispatch(curiumActions.updateState({provider: undefined, msg: "Curium not installed!"}))
    }
    return
  }
  dispatch(curiumActions.updateState({provider: window.keplr, msg: ""}))
  if (window.getOfflineSigner) {
    try {
      let accounts = appState.accountsState.accounts;
      const chainId = "bluzelleTestNetPublic-22";
      try {
        const result = await window.keplr.enable(chainId);
      } catch (e) {
        console.log("This is where the error occurs");
      }
      // console.log(result);
      const offlineSigner = window.getOfflineSigner(chainId);
      const curiumAccounts = await offlineSigner.getAccounts();
      let updatedAccounts: Accounts = {};
      curiumAccounts.forEach((accountData: AccountData) => {
        if (accounts[accountData.address]) {
          updatedAccounts[accountData.address] = accounts[accountData.address]
        } else {
          updatedAccounts[accountData.address] = {
            wallet: AccountWallet.CURIUM_EXTENSION_WALLET,
            isLoggedIn: false,
            publicAddress: accountData.address,
            publicKey: Buffer.from(accountData.pubkey).toString('hex')
          };
        }
      });
      if (curiumAccounts.length===0) {
        let filteredAccounts: Accounts = {};
        Object.keys(accounts).forEach((publicAddress: string) => {
          if (accounts[publicAddress].wallet!==AccountWallet.CURIUM_EXTENSION_WALLET) {
            filteredAccounts[publicAddress] = accounts[publicAddress];
          }
        })
        dispatch(curiumActions.setIsConnected(false));
        dispatch(accountsActions.updateAccounts({...filteredAccounts, ...updatedAccounts}));
      } else {
        dispatch(curiumActions.setIsConnected(true));
        dispatch(accountsActions.updateAccounts({...accounts, ...updatedAccounts}));
      }
      dispatch(accountsActions.updateAccounts({...accounts, ...updatedAccounts}));
      // dispatch(accountActions.setCurrentAccount(updatedAccounts[accounts[0]]));
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
}

export const manageAccountsFromMetaMask = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const appState = getState();
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
  if (window.ethereum && provider) {
    try {
      let accounts = appState.accountsState.accounts;
      const accountsArr: string[] = await (window.ethereum! as any).request({method: 'eth_accounts'})
      let updatedAccounts: Accounts = {};
      accountsArr.forEach((accountAddress: string) => {
        if (accounts[accountAddress]) {
          updatedAccounts[accountAddress] = accounts[accountAddress]
        } else {
          updatedAccounts[accountAddress] = {
            wallet: AccountWallet.METAMASK_EXTENSION_WALLET,
            isLoggedIn: false,
            publicAddress: accountAddress,
            publicKey: ''
          };
        }
      });

      if (accountsArr.length===0) {
        let filteredAccounts: Accounts = {};
        Object.keys(accounts).forEach((publicAddress: string) => {
          if (accounts[publicAddress].wallet!==AccountWallet.METAMASK_EXTENSION_WALLET) {
            filteredAccounts[publicAddress] = accounts[publicAddress];
          }
        })
        dispatch(metamaskActions.setIsConnected(false));
        dispatch(accountsActions.updateAccounts({...filteredAccounts, ...updatedAccounts}));
      } else {
        dispatch(metamaskActions.setIsConnected(true));
        dispatch(accountsActions.updateAccounts({...accounts, ...updatedAccounts}));
      }
    } catch (err) {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    }
  }
}

export const manageAccounts = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await manageAccountsFromCurium()(dispatch, getState);
  await manageAccountsFromMetaMask()(dispatch, getState);
};

export const promptMetamaskPublicKey = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  const {provider} = getState().metamaskState;
  if (provider) {
    try {
      const result:string = await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account.publicAddress], // you must have access to the specified account
      });
    } catch (error: any) {
      if (error.code===4001) {
        // EIP-1193 userRejectedRequest error
        console.log("We can't encrypt anything without the key.");
      } else {
        console.error(error);
      }
    }
  }
};


const loginWithMetamaskPublicKey = async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  const {loginToken} = (await requestLoginToken({publicAddress: account.publicAddress})).data;
  const {provider} = getState().metamaskState;
  // if (provider) {
  //   provider
  //     .request({
  //       method: 'eth_getEncryptionPublicKey',
  //       params: [account.publicAddress], // you must have access to the specified account
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
}

const loginWithMetamaskPublicAddress = async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  const {loginToken} = (await requestLoginToken({publicAddress: account.publicAddress})).data;
  //const method = 'eth_signTypedData_v4';
  const method = 'personal_sign';
  const params = [loginToken, account.publicAddress];
  const {provider} = getState().metamaskState;

  provider.sendAsync({
    method,
    params,
    from: account.publicAddress,
  }, function (err: any, result: any) {
    if (err) return console.dir(err)

    if (result.error) {
      alert(result.error.message)
    }
    if (result.error) return console.error('ERROR', result)
    console.log('TYPED SIGNED:' + JSON.stringify(result.result))
    console.log(result);
    dispatch(accountsActions.setAccountState({
      account: currentAccount,
      accountState: {...accounts[currentAccount], isLoggedIn: true, loginToken, loginTokenSignature: result}
    }));

    const recovered = sigUtil.recoverPersonalSignature({data: loginToken, sig: result.result})

    if (ethUtil.toChecksumAddress(recovered)===ethUtil.toChecksumAddress(account.publicAddress)) {
      alert('Successfully recovered signer as ' + account.publicAddress);
    } else {
      alert('Failed to verify signer when comparing ' + result + ' to ' + account.publicAddress);
    }

  });
}

export const loginBluezelle = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  if (account) {
    switch (account.wallet) {
      case AccountWallet.METAMASK_EXTENSION_WALLET:
        await loginWithMetamaskPublicKey(dispatch, getState);
        await loginWithMetamaskPublicAddress(dispatch, getState);
        break;
      case AccountWallet.CURIUM_EXTENSION_WALLET:
        dispatch(accountsActions.setAccountState({
          account: currentAccount,
          accountState: {...account, isLoggedIn: true}
        }));
    }
  }
};
