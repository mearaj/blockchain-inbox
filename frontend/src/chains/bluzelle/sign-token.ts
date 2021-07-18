import elliptic from 'elliptic';

// this function assumes privateKey is validated before call
export const signTokenForBlzChain = (privateKey: string, token: string) => {
  const secp256k1 = new elliptic.ec("secp256k1");
  const key = secp256k1.keyFromPrivate(privateKey);
  const hash = CryptoJS.SHA256(
    CryptoJS.lib.WordArray.create(token as any)
  ).toString();

  const signature = key.sign(hash, {
    canonical: true,
  });
  return Buffer.from(new Uint8Array(
    signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32))
  )).toString('hex');
}
