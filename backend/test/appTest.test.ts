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

  it('should be able to get a token with valid credentials', (done) => {
    request(app)
      .post(TOKEN_ENDPOINT)
      .send({publicKey: bluzelleAccount.publicKey, chainName:bluzelleAccount.chainName})
      .end((err, res) => {
        assert(typeof res.body.token === 'string', "No token returned by the backend");
        done();
      });
  });

});
