import {Window as KeplrWindow} from "@keplr-wallet/types";

interface EthereumProvider {
  request:Promise<any>;
  isMetaMask?: boolean;
}


declare global {
  interface Window extends KeplrWindow, EthereumProvider {}
}
