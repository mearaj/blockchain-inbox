import {bluzelle} from '@bluzelle/sdk-js';
import {initSDK} from 'config';




const uuid = "blockchain-inbox";

initSDK().then((sdk)=> {
  console.log(sdk);
  console.log("STARTED WATCH");
}).catch(console.log);

console.log("STARTED");
