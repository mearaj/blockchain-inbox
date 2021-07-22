import {Dispatch} from 'redux';
import {AppState} from 'store/index';
import {curiumActions} from 'store/Curium';
import {CHAIN_ID} from 'config';
import {CURIUM_NOT_INSTALLED} from 'store/Account/errors';
import {Account} from 'store/Account';
import {accountsActions} from 'store/Account/reducers';


export const getAccountsFromCurium = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const appState = getState();
  if (!window.keplr) {
    dispatch(curiumActions.setError(CURIUM_NOT_INSTALLED));
    clearWalletAccounts(dispatch, getState, "Curium");
    return
  }
  dispatch(curiumActions.clearError());
  if (window.getOfflineSigner) {
    let accounts = appState.accountsState.accounts;
    let updatedAccounts: Account[] = [];
    let isConnected: boolean;
    try {
      try {
        await window.keplr.enable(CHAIN_ID);
      } catch (e) {
        clearWalletAccounts(dispatch, getState, "Curium");
        console.log(e);
      }
      const offlineSigner = window.getOfflineSigner(CHAIN_ID);
      const curiumAccounts = await offlineSigner.getAccounts();
      // curiumAccounts.forEach((accountData: AccountData) => {
      //   if (accounts[accountData.address]) {
      //     updatedAccounts[accountData.address] = accounts[accountData.address]
      //   } else {
      //     updatedAccounts[accountData.address] = {
      //       chainName: "Bluzelle Mainnet",
      //       auth: "",
      //       publicKey: Buffer.from(accountData.pubkey).toString('hex')
      //     };
      //   }
      // });


      console.log(updatedAccounts);
      if (curiumAccounts.length===0) {
        clearWalletAccounts(dispatch, getState,"Curium");
        isConnected = false;
      } else {
        isConnected = true;
      }
    } catch (e) {
      isConnected = false;
      console.log(e);
    }
    dispatch(curiumActions.setIsConnected(isConnected));
    dispatch(accountsActions.setAccounts({...accounts, ...updatedAccounts}));
  }
}
const clearWalletAccounts = (dispatch: Dispatch, getState: () => AppState, walletName: string) => {
  // const appState = getState();
  // const curiumState = getState().curiumState;
  // const accounts = appState.accountsState.accounts;
  // const updatedAccounts: Accounts = {};
  // Object.keys(accounts).forEach((publicAddress: string) => {
  //   if (accounts[publicAddress].chainName!==walletName) {
  //     updatedAccounts[publicAddress] = accounts[publicAddress];
  //   }
  // })
  // dispatch(accountsActions.setAccounts(updatedAccounts));
  // switch (walletName) {
  //   case "Curium":
  //     if (!curiumState.isConnected) {
  //       dispatch(curiumActions.setIsConnected(false));
  //     }
  //     break;
  // }
}

export const getAccountsFromWallets = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await getAccountsFromCurium()(dispatch, getState);
};


export const loginBluezelle = () => async (dispatch: Dispatch, getState: () => AppState) => {
  // const {accounts, currentAccount} = getState().accountsState;
  // const account = accounts[currentAccount];
  // if (account) {
  //   switch (account.chainName) {
  //     case "Bluzelle Mainnet":
  //       dispatch(accountsActions.setAccountState({
  //         account: currentAccount,
  //         accountState: {...account, auth: ""}
  //       }));
  //   }
  // }
};

export const loginWithCurium = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await getAccountsFromCurium()(dispatch, getState);
  dispatch(accountsActions.setCurrentAccountAuth(""));
}
