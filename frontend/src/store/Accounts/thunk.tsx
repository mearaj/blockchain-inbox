import detectEthereumProvider from '@metamask/detect-provider';
import {metamaskActions} from 'store/Metamask';
import {Dispatch} from 'redux';
import {Accounts, accountsActions} from 'store/Accounts/index';
import {AccountWallet} from 'store/Account';
import {AppState} from 'store/index';
import {curiumActions} from 'store/Curium';
import {AccountData} from 'secretjs/types/wallet';


const manageAccountsFromCurium = async (curiumState: any, appState: AppState, dispatch: Dispatch) => {
  if (!window.keplr) {
    if (curiumState.provider) {
      dispatch(curiumActions.updateState({provider: undefined, msg: "Curium not installed!"}))
    }
    return
  }
  const accountsState = appState.accountsState;
  const accountState = appState.accountState;
  if (window.getOfflineSigner && accountsState) {
    try {
      const chainId = "bluzelleTestNetPublic-22";
      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      let updatedAccounts: Accounts = {};
      accounts.forEach((accountData: AccountData) => {
        if (accountData.address === accountState.publicAddress) {
          updatedAccounts[accountState.publicAddress] = accountState;
        } else if (accountsState[accountData.address]) {
          updatedAccounts[accountData.address] = accountsState[accountData.address]
        } else {
          updatedAccounts[accountData.address] = {
            wallet: AccountWallet.CURIUM_EXTENSION_WALLET,
            isLoggedIn: false,
            publicAddress: accountData.address,
            publicKey: Buffer.from(accountData.pubkey).toString('hex')
          };
        }
      });
      if (accountState && accountState.publicAddress) {
        updatedAccounts[accountState.publicAddress] = accountState;
      }
      dispatch(accountsActions.updateAccounts({...accountsState, ...updatedAccounts}));
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
}

const manageAccountsFromMetaMask = async (provider: any, dispatch: Dispatch, appState: AppState) => {
  if (window.ethereum && provider) {
    try {
      const accountsState = appState.accountsState;
      const accountState = appState.accountState;
      const accountsArr: string[] = await (window.ethereum! as any).request({method: 'eth_accounts'})
      let updatedAccounts: Accounts = {};
      accountsArr.forEach((accountAddress: string) => {
        if (accountAddress === accountState.publicAddress) {
          updatedAccounts[accountState.publicAddress] = accountState;
        }
        else if (accountsState[accountAddress]) {
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

      dispatch(accountsActions.updateAccounts({...accountsState, ...updatedAccounts}));
    }
     catch(err) {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      }
  }
}

export const manageAccounts = () => async (dispatch: Dispatch, appState: () => AppState) => {
  const {accountsState, curiumState} = appState();
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
  //dispatch(metamaskActions.updateState({provider, errMsg}));
  await manageAccountsFromCurium(curiumState, appState(), dispatch);
  await manageAccountsFromMetaMask(provider, dispatch, appState());
};
