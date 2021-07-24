import {Buffer} from 'buffer';
import elliptic from 'elliptic';
import CryptoJS from 'crypto-js';
import {verifyBluzSignature} from './utils/verifyBluzSignature';
import {ethers, Wallet} from 'ethers';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';



//console.log(sigUtil);

// const encryptedMessage = ethUtil.bufferToHex(
//   Buffer.from(
//     JSON.stringify(
//       sigUtil.encrypt(
//         "0x51C630D6ab8Ef8B671a55B970B9d2EECF79c2410",
//         { data: 'Hello world!' },
//         'x25519-xsalsa20-poly1305'
//       )
//     ),
//     'utf8'
//   )
// );

// const mnemonic = "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space";
// const wallet = Wallet.fromMnemonic(mnemonic);
//
// const publicKey = sigUtil.getEncryptionPublicKey("492ad10447630a32f04db6be0009829fab9435cf1d00bc0341b2a5a80ddc281a")
// const encryptedMessage = sigUtil.encrypt(
//   "036719ed947b16b3d00969017214ccf94c1e04118d72432f12ef96ba969bc3c43a",
//   {data: 'Hello world!'},
//   'x25519-xsalsa20-poly1305'
// )
//
// const anotherEncrypted = ethUtil.bufferToHex(Buffer.from(JSON.stringify(encryptedMessage),'utf8'));
// const decrypted = sigUtil.decrypt(encryptedMessage,
//   wallet.privateKey);

// const dummyEthAccountPrivateKey = "140841d941c5089c5af70155d9e0e1d8c749359cc7be87fdb316186936fa0c59"
// const privateWallet = new Wallet(dummyEthAccountPrivateKey);
// const token = "7596c463-bbe8-498d-820d-726ec22d7986";
// console.log("publicKey", privateWallet.publicKey);
// privateWallet.signMessage(token).then((result)=> {
//   console.log("signature: ", result);
//   const recovered = sigUtil.recoverPersonalSignature({data: token, sig: result});
//   const addressBuff = Buffer.from(privateWallet.publicKey.substr(4), "hex");
//   console.log(addressBuff.toString("hex"));
//   const address = ethUtil.publicToAddress(addressBuff).toString("hex");
//   console.log(address);
// });


// // Validate mnemonic.
// // Checksome is not validate in this method.
// // Keeper should handle the case of invalid checksome.
// try {
//   const result = bip39.mnemonicToEntropy(add.mnemonic);
//   console.log(result);
// } catch (e) {
//   console.log(e);
//   if (e.message !== "Invalid mnemonic checksum") {
//     throw e;
//   }
// }


//
//
// const getPubKey = (privKey:Uint8Array): Uint8Array =>  {
//   const secp256k1 = new elliptic.ec("secp256k1");
//   const key = secp256k1.keyFromPrivate(privKey);
//   return new Uint8Array(key.getPublic().encodeCompressed("array"))
// }
//
//
//
//
// const privateKey = Buffer.from(new Uint8Array(pvtKey)).toString('hex');
// const publicKey = Buffer.from(getPubKey(pvtKey)).toString('hex');
// const loginToken = "8e536cf8-09e1-4d66-ab5c-440719a94fa0";
// const signature = sign(loginToken, privateKey);
// const signatureString = Buffer.from(new Uint8Array(signature)).toString('hex');
// const signatureDerivedBack = new Uint8Array (Buffer.from(signatureString, 'hex'));
// const isValid = verifyEthSignature(loginToken, publicKey, signatureString);
// console.log(isValid);
// console.log(publicKey);
// console.log(signatureString);
