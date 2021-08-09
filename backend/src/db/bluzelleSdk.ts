import {SDKOptions} from '@bluzelle/sdk-js/lib/client-lib/rpc';
import {bluzelle, BluzelleSdk} from '@bluzelle/sdk-js';
import {SDK_CONNECTION_URL, SDK_GAS_PRICE, SDK_MAX_GAS, SDK_MNEMONIC} from 'config';

const bluzelleConfig: SDKOptions = {
  mnemonic: SDK_MNEMONIC,
  url: SDK_CONNECTION_URL,
  maxGas: SDK_MAX_GAS,
  gasPrice: SDK_GAS_PRICE,
};

let bluzelleSdk: BluzelleSdk;

// the bluzelleSdk doesn't throws error if invalid url is provided, hence intentionally crashing the app if it's
// undefined
setTimeout(() => {
  if (!bluzelleSdk) {
    console.log("bluzelleSdk is not defined!, exiting app...");
    process.exit(1);
  }
}, 30000);

export const initSDK = async () => {
  if (bluzelleSdk!==undefined) {
    return bluzelleSdk;
  }
  bluzelleSdk = await bluzelle(bluzelleConfig);
  if (!bluzelleSdk) {
    throw ("Unable to initialize bluzelleSdk...");
  }
  return bluzelleSdk;
};

initSDK().then(() => console.log("Bluzelle SDK Initialized..."));

// "frontend"
// "bluzelle1pm2902v7z87ektlngvqy23yd4geahd2j03mg3v"
// "crunch digital library parent female spell rose comic rotate clock camera snap income outside notable feel scorpion obtain transfer aim water security scene prepare"

