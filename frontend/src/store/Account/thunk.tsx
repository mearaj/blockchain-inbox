import detectEthereumProvider from '@metamask/detect-provider';
import {Dispatch} from 'redux';
import {Accounts, accountsActions} from 'store/Account/index';
import {AccountWallet} from 'store/Account/account';
import {AppState} from 'store/index';
import {curiumActions} from 'store/Curium';
import {AccountData} from 'secretjs/types/wallet';
import {metamaskActions} from 'store/Metamask';


const manageAccountsFromCurium = async (dispatch: Dispatch, getState: () => AppState) => {
  const appState = getState();
  const curiumState = appState.curiumState;
  if (!window.keplr) {
    if (curiumState.provider) {
      dispatch(curiumActions.updateState({provider: undefined, msg: "Curium not installed!"}))
    }
    return
  }
  const accounts = appState.accountsState.accounts;
  if (window.getOfflineSigner && accounts) {
    try {
      const chainId = "bluzelleTestNetPublic-22";
      await window.keplr.enable(chainId);
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

const manageAccountsFromMetaMask = async (dispatch: Dispatch, getState: () => AppState) => {
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
      const accounts = appState.accountsState.accounts;
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
      console.log("metamask accounts are...", accountsArr);

      dispatch(accountsActions.updateAccounts({...accounts, ...updatedAccounts}));
    } catch (err) {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    }
  }
}

export const manageAccounts = () => async (dispatch: Dispatch, getState: () => AppState) => {
  await manageAccountsFromCurium(dispatch, getState);
  await manageAccountsFromMetaMask(dispatch, getState);
  console.log(getState());
};
