import {LOGIN_ENDPOINT, PORT, REQUEST_LOGIN_TOKEN_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'sdk';
import cors from 'cors';
import {requestLoginToken} from 'routes/request-login-token';
import {login} from 'routes/login';

const app = express();
app.use(express.json());
app.use(cors());


initSDK().then((sdk) => {
  app.post(REQUEST_LOGIN_TOKEN_ENDPOINT, requestLoginToken);
  app.post(LOGIN_ENDPOINT, login);
}).catch(console.log);


app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});




