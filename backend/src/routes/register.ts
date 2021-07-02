// import {Router} from 'express';
// import {REGISTER_ENDPOINT, REGISTRATION_STATUS_ENDPOINT} from 'config';
// import {initSDK} from 'sdk';
//
// const router = Router();
//
// router.post(REGISTER_ENDPOINT);
// router.get(REGISTRATION_STATUS_ENDPOINT, async (req,res,next)=> {
//   const sdk = await initSDK();
//   try {
//     let {publicKey, publicAddress} = req.body;
//     console.log(JSON.stringify(sdk));
//     if (!publicKey || !publicAddress) {
//       return res.send(false);
//     }
//     const isRegistered = await sdk.db.q.Has({key: publicKey, uuid: publicAddress});
//     console.log(isRegistered);
//     return res.send(isRegistered.has);
//   } catch (e) {
//     console.log(e);
//     return res.json(false);
//   }
// });
//
// export default router;
//

export {};
