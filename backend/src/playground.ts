import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import {Wallet} from 'ethers';
import {toBuffer} from 'ethereumjs-util';

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

const mnemonic = "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space";
const wallet = Wallet.fromMnemonic(mnemonic);

const publicKey = sigUtil.getEncryptionPublicKey("492ad10447630a32f04db6be0009829fab9435cf1d00bc0341b2a5a80ddc281a")
const encryptedMessage = sigUtil.encrypt(
  "036719ed947b16b3d00969017214ccf94c1e04118d72432f12ef96ba969bc3c43a",
  {data: 'Hello world!'},
  'x25519-xsalsa20-poly1305'
)

// const anotherEncrypted = ethUtil.bufferToHex(Buffer.from(JSON.stringify(encryptedMessage),'utf8'));
// const decrypted = sigUtil.decrypt(encryptedMessage,
//   wallet.privateKey);

