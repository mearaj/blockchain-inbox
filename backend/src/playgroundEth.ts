import * as bip39 from 'bip39';
import {fromSeed} from 'bip32';
import elliptic from 'elliptic';
import {verifyBluzSignature} from './utils/verifyBluzSignature';
import CryptoJS from 'crypto-js';
import eccrypto from 'eccrypto';
import {initSDK} from './db/bluzelleSdk';

const bluzCredentials = {
  mnemonic: "title child oval endless ladder brand venue burden pill income merry motor large above slight own elbow catalog rubber artwork tiger way talk space",
  bip44HDPath: {
    account: 0,
    change: 0,
    addressIndex: 0
  },
}


const validateMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
}
const signBluzelleMessage = (msg: string, privKey: string): Uint8Array => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const key = secp256k1.keyFromPrivate(privKey);


  const hash = CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(msg as any)
  ).toString();

  const signature = key.sign(hash, {
    canonical: true,
  });
  const isValid = key.verify(hash, signature);
  return new Uint8Array(
    signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32))
  );
}


const generateWalletFromMnemonic = (
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


const playgroundBluz = async () => {
  const pvtKey = generateWalletFromMnemonic(bluzCredentials.mnemonic);
  const secp256k1 = new elliptic.ec("secp256k1");
  const key = secp256k1.keyFromPrivate(pvtKey, 'hex');
  const publicKey = key.getPublic().encode('hex', true);
  const textToSign = "Hello World!";

  // curium way of signing
  const signature = signBluzelleMessage(textToSign, key.getPrivate().toString('hex'));
  const isValid = verifyBluzSignature(textToSign, publicKey, signature);
  //console.log(isValid);

  // using secp256k1
  const signature2 = key.sign(textToSign)
  const isValid2 = key.verify(textToSign, signature2);
  //console.log(isValid2);

  // using curium signature and sec256k1 for verifying
  const hash = CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(textToSign as any)
  ).toString();
  const isValid3 = key.verify(hash, {
      r: signature.slice(0, 32),
      s: signature.slice(32, 64)
    }
  );
  // console.log(signature.length);
  // console.log(isValid3);

  // encrypting message
  const message = "This is the message that should be encrypted/decrypted";
  const encrypted = await eccrypto.encrypt(Buffer.from(publicKey, 'hex'), Buffer.from(message));
  const decrypted = await eccrypto.decrypt(Buffer.from(pvtKey), encrypted);
  // console.log(encrypted);
  // console.log(decrypted.toString());
  const bluzelleSDK = await initSDK();

  // try {
  //   const transactions = await bluzelleSDK.db.withTransaction(() => {
  //     bluzelleSDK.db.tx.Create({
  //       creator: bluzelleSDK.db.address,
  //       uuid: 'uuid',
  //       key: 'firstKey',
  //       value: new TextEncoder().encode('firstValue'),
  //       metadata: new Uint8Array(10),
  //       lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
  //     });
  //     bluzelleSDK.db.tx.Create({
  //       creator: bluzelleSDK.db.address,
  //       uuid: 'uuid',
  //       key: 'secondKey',
  //       value: new TextEncoder().encode('secondValue'),
  //       metadata: new Uint8Array(10),
  //       lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
  //     });
  //   }, {memo: 'someMemo'});
  //
  //   console.log(transactions);
  // } catch (e) {
  //   console.log(e);
  // }
  const msg = await bluzelleSDK.db.q.Read({uuid: 'uuid', key: 'firstKey'});
  const msg2 = await bluzelleSDK.db.q.Read({uuid: 'uuid2', key: 'firstKey'});
  console.log(msg);
  console.log(new TextDecoder().decode(msg.value));
  console.log(Object.keys(msg2));
  console.log(new TextDecoder().decode(msg2.value));
  console.log(await bluzelleSDK.db.q.Keys({uuid: 'uuid'}));
  console.log(await bluzelleSDK.bank.q.Balance({'address': bluzelleSDK.bank.address, denom: 'ubnt'}));

  return "terminating...."
};

playgroundBluz().then(console.log).catch(console.log);
