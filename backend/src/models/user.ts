import {v4 as uuid} from 'uuid';

const LOGIN_TOKEN_VALIDITY = 10 * 60 * 1000 // 10 minutes converted to milliseconds


// Mongoose
// username blockchaininbox
// password J6ALXWFMmyjnw8U

export class User {
  public token: string;
  public creationTime:number;
  constructor(public publicAddressHexString:string) {
    this.token = uuid();
    this.creationTime = Date.now().valueOf();
  }

  resetUUID = ()=> {
    this.token = uuid();
    this.creationTime = Date.now().valueOf();
  };

  // thresholdMs is milliseconds to compare with
  isTokenExpired = (thresholdMs:number) => {
    return Date.now().valueOf() - this.creationTime >= thresholdMs;
  }

  getPublicAddressHexString = ()=> {
    return this.publicAddressHexString;
  }
}

export type Users = {[key:string]: User};
