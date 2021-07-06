import {Window as KeplrWindow} from "@keplr-wallet/types";


declare global {
  interface Window extends KeplrWindow, Window {
    ethereum: any;
    web3: any;
  }
}
declare var web3;

declare module 'redux-persist/lib/storage';
