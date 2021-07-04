export class User {
  publicKey?: string;
  signedLoginToken?:string;

  constructor(public publicAddress:string, public loginToken:string) {
  }
}

// export type Users = {[key:string]: User};

// Interface to map unique values to each User
export interface Users {
  [key:string]: User
}
