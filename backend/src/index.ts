import {PORT, REQUEST_LOGIN_TOKEN_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'sdk';
import cors from 'cors';
import {registerLoginToken} from 'routes/reuest-login-token';

const app = express();
app.use(express.json());
app.use(cors());


initSDK().then((sdk) => {
  // app.use(registrationRoute);
}).catch(console.log);

app.use(REQUEST_LOGIN_TOKEN_ENDPOINT, registerLoginToken);


app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});




