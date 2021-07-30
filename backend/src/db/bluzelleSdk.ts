import {SDKOptions} from '@bluzelle/sdk-js/lib/client-lib/rpc';
import {bluzelle, BluzelleSdk} from '@bluzelle/sdk-js';

const mintResult = {
  address: "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah",
  mnemonic: "donate artwork mandate vacuum wreck crash junk zebra total toss say student loan satisfy moon profit duck fire wreck bacon unit retire strong rely"
};

const bluzelleConfig: SDKOptions = {
  mnemonic: mintResult.mnemonic,
  url: "wss://client.sentry.testnet.private.bluzelle.com:26657",
  maxGas: 100000000,
  gasPrice: 0.002,
};

let bluzelleSdk: BluzelleSdk;

// the bluzelleSdk doesn't throws error if invalid url is provided, hence intentionally crashing the app if it's
// undefined
setTimeout( ()=> {
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

initSDK().then(() => console.log("bluzelleSdkInitialized"));

// "frontend"
// "bluzelle1pm2902v7z87ektlngvqy23yd4geahd2j03mg3v"
// "crunch digital library parent female spell rose comic rotate clock camera snap income outside notable feel scorpion obtain transfer aim water security scene prepare"

