import {SDKOptions} from '@bluzelle/sdk-js/lib/client-lib/rpc';

const mintResult = {
  address: "bluzelle1ns5julcqlw8yx8umjklg5ggrq8waphmw04sgqn",
  mnemonic: "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space"
};

export const bluzelleConfig: SDKOptions = {
  mnemonic: mintResult.mnemonic,
  url: "wss://client.sentry.testnet.private.bluzelle.com:26657",
  maxGas: 100000000,
  gasPrice: 0.002,
};


const BLUZELLE_TESTNET_PRIVATE_CHAIN_ID = "bluzelleTestNetPrivate-133";
export const BLUZELLE_CHAIN_ID = BLUZELLE_TESTNET_PRIVATE_CHAIN_ID;

// public
//export const CHAIN_ID = "bluzelleTestNetPublic-22";

// mainet
//export const CHAIN_ID = "net-6";

// useEffect(() => {
//   const timerID = setTimeout(async () => {
//     const sdk = await bluzelle(bluzelleConfig);
//     console.log(sdk);
//   });
//   return () => clearTimeout(timerID);
// });

// "bluzelle1pm2902v7z87ektlngvqy23yd4geahd2j03mg3v"
// "crunch digital library parent female spell rose comic rotate clock camera snap income outside notable feel scorpion obtain transfer aim water security scene prepare"

