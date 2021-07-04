import {PORT, REQUEST_LOGIN_TOKEN_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'sdk';
import cors from 'cors';
import {requestLoginToken} from 'routes/request-login-token';

const app = express();
app.use(express.json());
app.use(cors());


initSDK().then((sdk) => {
   app.use(requestLoginToken);
}).catch(console.log);

app.post(REQUEST_LOGIN_TOKEN_ENDPOINT, requestLoginToken);


app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});




