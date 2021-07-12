import * as bip39 from 'bip39';
import {fromSeed} from 'bip32';
import {Buffer} from 'buffer';

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
// )717eb35c-5a4c-4846-b993-42b0a9be6a8c

// const anotherEncrypted = ethUtil.bufferToHex(Buffer.from(JSON.stringify(encryptedMessage),'utf8'));
// const decrypted = sigUtil.decrypt(encryptedMessage,
//   wallet.privateKey);

// const dummyEthAccountPrivateKey = "140841d941c5089c5af70155d9e0e1d8c749359cc7be87fdb316186936fa0c59"
// const privateWallet = new Wallet(dummyEthAccountPrivateKey);
// const token = "717eb35c-5a4c-4846-b993-42b0a9be6a8c";
// console.log("publicKey", privateWallet.publicKey);
// privateWallet.signMessage(token).then((result)=> {
//   console.log(result);
//   const recovered = sigUtil.recoverPersonalSignature({data: token, sig: result});
//   const addressBuff = buffer.Buffer.from(privateWallet.publicKey.substr(4), "hex");
//   console.log(addressBuff.toString("hex"));
//   const address = ethUtil.publicToAddress(addressBuff).toString("hex");
//   console.log(address);
// })

const add = {
  mnemonic: "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space",
  bip44HDPath: {
    account: 0,
    change: 0,
    addressIndex: 0
  },
}
// Validate mnemonic.
// Checksome is not validate in this method.
// Keeper should handle the case of invalid checksome.
try {
  const result = bip39.mnemonicToEntropy(add.mnemonic);
  console.log(result);
} catch (e) {
  console.log(e);
  if (e.message !== "Invalid mnemonic checksum") {
    throw e;
  }
}
 const   generateWalletFromMnemonic = (
  mnemonic: string,
  path: string = `m/44'/118'/0'/0/0`,
  password: string = ""
): Uint8Array => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, password);
  const masterKey = fromSeed(seed);
  const hd = masterKey.derivePath(path);

  const privateKey = hd.privateKey;
  if (!privateKey) {
    throw new Error("null hd key");
  }
  return privateKey;
}
const pvtKey = generateWalletFromMnemonic(add.mnemonic);
const validateMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
}
console.log(pvtKey);
console.log(new Uint8Array(pvtKey));
console.log(Buffer.from(pvtKey).toString('hex'));
console.log(Buffer.from(pvtKey).toString('hex').length);
