export class User {
  publicKey?: string;
  signedLoginToken?:string;

  constructor(public publicAddress:string, public loginToken:string) {
  }
}

// export type Users = {[key:string]: User};

export interface loginToken {
  // key is the public address of the user
  [key:string]: User
}
