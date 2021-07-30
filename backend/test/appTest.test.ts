import request from 'supertest';
import initApp from 'app';
import {TOKEN_ENDPOINT} from 'config';
import {Express} from 'express';
import assert from 'assert';
import {bluzelleAccount} from './accounts';

let app: Express;

describe(('Login Token'), () => {
  before(async () => {
    app = await initApp();
  });
  it('should be able to get a token by providing a valid Public Key and Chain Name', (done) => {
    request(app)
      .post(TOKEN_ENDPOINT)
      .send({publicKey: bluzelleAccount.publicKey, chainName: bluzelleAccount.chainName})
      .end((err, res) => {
        assert(typeof res.body.token==='string' && res.body.token.length > 0, "No token returned by the backend");
        done();
      });
  });
});
