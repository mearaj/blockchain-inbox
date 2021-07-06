import detectEthereumProvider from '@metamask/detect-provider';
import {Dispatch} from 'redux';
import {Accounts, accountsActions} from 'store/Account/index';
import {WalletNameEnum} from 'store/Account/account';
import {AppState} from 'store/index';
import {curiumActions} from 'store/Curium';
import {AccountData} from 'secretjs/types/wallet';
import {metamaskActions} from 'store/Metamask';
import {requestLoginToken} from 'api';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {CHAIN_ID} from 'config';

export const getAccountsFromCurium = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const appState = getState();
  if (!window.keplr) {
    dispatch(curiumActions.setError("Curium not installed!"));
    dispatch(curiumActions.setIsConnected(false));
    return
  }
  dispatch(curiumActions.clearError());
  if (window.getOfflineSigner) {
    let accounts = appState.accountsState.accounts;
    let updatedAccounts: Accounts = {};
    let isConnected: boolean;
    try {
      let result;
      try {
        result = await window.keplr.enable(CHAIN_ID);
      } catch (e) {
        console.log("This is where the error occurs");
      }
      console.log(result);
      const offlineSigner = window.getOfflineSigner(CHAIN_ID);
      const curiumAccounts = await offlineSigner.getAccounts();
      curiumAccounts.forEach((accountData: AccountData) => {
        if (accounts[accountData.address]) {
          updatedAccounts[accountData.address] = accounts[accountData.address]
        } else {
          updatedAccounts[accountData.address] = {
            wallet: WalletNameEnum.CURIUM_EXTENSION_WALLET,
            isLoggedIn: false,
            publicAddress: accountData.address,
            publicKey: Buffer.from(accountData.pubkey).toString('hex')
          };
        }
      });
      if (curiumAccounts.length===0) {
       clearWalletAccounts(dispatch, getState, WalletNameEnum.CURIUM_EXTENSION_WALLET);
        isConnected = false;
      } else {
        isConnected = true;
      }
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
      isConnected = false;
      console.log(e);
    }
    dispatch(curiumActions.setIsConnected(isConnected));
    dispatch(accountsActions.setAccounts({...accounts, ...updatedAccounts}));
  }
}
const clearWalletAccounts = (dispatch: Dispatch, getState: () => AppState, walletName:WalletNameEnum) => {
  const appState = getState();
  const metamaskState = getState().metamaskState;
  const curiumState = getState().curiumState;
  const accounts = appState.accountsState.accounts;
  const updatedAccounts:Accounts = {};
  Object.keys(accounts).forEach((publicAddress: string) => {
    if (accounts[publicAddress].wallet!== walletName) {
      updatedAccounts[publicAddress] = accounts[publicAddress];
    }
  })
  dispatch(accountsActions.setAccounts(updatedAccounts));
  switch (walletName) {
    case WalletNameEnum.CURIUM_EXTENSION_WALLET:
      if (!curiumState.isConnected) {
        dispatch(curiumActions.setIsConnected(false));
      }
      break;
    case WalletNameEnum.METAMASK_EXTENSION_WALLET:
      if (!metamaskState.isConnected) {
        dispatch(metamaskActions.setIsConnected(false));
      }
  }
}
export const getAccountsFromMetaMask = () => async (dispatch: Dispatch, getState: () => AppState) => {
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
  dispatch(metamaskActions.setError(errMsg));
  if (window.ethereum && provider) {
    let updatedAccounts: Accounts = {};
    let isConnected:boolean = appState.metamaskState.isConnected;
    let accounts = appState.accountsState.accounts;
    try {
      const accountsArr: string[] = await (window.ethereum! as any).request({method: 'eth_accounts'})
      accountsArr.forEach((accountAddress: string) => {
        if (accounts[accountAddress]) {
          updatedAccounts[accountAddress] = accounts[accountAddress]
        } else {
          updatedAccounts[accountAddress] = {
            wallet: WalletNameEnum.METAMASK_EXTENSION_WALLET,
            isLoggedIn: false,
            publicAddress: accountAddress,
            publicKey: ''
          };
        }
      });

      if (accountsArr.length===0) {
        clearWalletAccounts(dispatch, getState, WalletNameEnum.METAMASK_EXTENSION_WALLET);
        isConnected = false;
      } else {
        isConnected = true;
      }
    } catch (err) {
      clearWalletAccounts(dispatch, getState, WalletNameEnum.METAMASK_EXTENSION_WALLET);
      isConnected = false;
      console.error(err);
    }
    dispatch(metamaskActions.setIsConnected(isConnected));
    dispatch(accountsActions.setAccounts({...accounts, ...updatedAccounts}));
  }
}

export const getAccountsFromWallets = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await getAccountsFromCurium()(dispatch, getState);
  await getAccountsFromMetaMask()(dispatch, getState);
};

export const promptMetamaskPublicKey = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  const provider = (window.ethereum) as any;
  if (provider) {
    try {
      const result: string = await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account.publicAddress], // you must have access to the specified account
      });
      dispatch(accountsActions.setLoginStatus(true));
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


export const loginWithMetamaskPublicKey = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  try {
    const {loginToken} = (await requestLoginToken({publicAddress: account.publicAddress})).data;
    dispatch(accountsActions.setLoginStatus(true));
  } catch (e) {
    console.log(e);
  }
  //dispatch(loaderActions.hideLoader());
  // const {provider} = getState().metamaskState;
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

const ERROR_METAMASK_USER_DENIED_SIGNATURE = {
 message:"MetaMask Message Signature: User denied message signature.",
 code: 4001
}

export const loginWithMetamaskPublicAddress = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  const {loginToken} = (await requestLoginToken({publicAddress: account.publicAddress})).data;
  //const method = 'eth_signTypedData_v4';
  const method = 'personal_sign';
  const params = [loginToken, account.publicAddress];
  const provider = (window.ethereum) as any;
  if (provider) {
    await provider.sendAsync({
      method,
      params,
      from: account.publicAddress,
    }, function (err: { code: number, message: string }, result: any) {
      if (err) {
        return dispatch(metamaskActions.setError(err.message));
      }
      if (result.error) {
        return dispatch(metamaskActions.setError(result.error.message));
      }
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
}

export const loginBluezelle = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const {accounts, currentAccount} = getState().accountsState;
  const account = accounts[currentAccount];
  if (account) {
    switch (account.wallet) {
      case WalletNameEnum.METAMASK_EXTENSION_WALLET:
        await loginWithMetamaskPublicKey()(dispatch, getState);
        await loginWithMetamaskPublicAddress()(dispatch, getState);
        break;
      case WalletNameEnum.CURIUM_EXTENSION_WALLET:
        dispatch(accountsActions.setAccountState({
          account: currentAccount,
          accountState: {...account, isLoggedIn: true}
        }));
    }
  }
};

export const loginWithCurium = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await getAccountsFromCurium()(dispatch, getState);
  dispatch(accountsActions.setLoginStatus(true));
}
