import {SDKOptions} from '@bluzelle/sdk-js/lib/client-lib/rpc';
import {bluzelle, BluzelleSdk} from '@bluzelle/sdk-js';

export const UUID = "blockchain-inbox";

// const mintResult = {
//   address: "bluzelle1ns5julcqlw8yx8umjklg5ggrq8waphmw04sgqn",
//   mnemonic: "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space"
// };

const mintResult = {
  address: "bluzelle1pm2902v7z87ektlngvqy23yd4geahd2j03mg3v",
  mnemonic: "crunch digital library parent female spell rose comic rotate clock camera snap income outside notable feel scorpion obtain transfer aim water security scene prepare"
};

const bluzelleConfig: SDKOptions = {
  mnemonic: mintResult.mnemonic,
  url: "wss://client.sentry.testnet.private.bluzelle.com:26657",
  maxGas: 100000000,
  gasPrice: 0.002,
};

let sdk: BluzelleSdk;

export const initSDK = async () => {
  if (sdk !== undefined) {
    return sdk;
  }
  sdk = await bluzelle(bluzelleConfig);
  return sdk;
};
// initSDK().then((res)=> {
//   console.log(res);
// })
// "bluzelle1pm2902v7z87ektlngvqy23yd4geahd2j03mg3v"
// "crunch digital library parent female spell rose comic rotate clock camera snap income outside notable feel scorpion obtain transfer aim water security scene prepare"
