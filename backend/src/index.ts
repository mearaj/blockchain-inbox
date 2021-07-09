import {PORT, REQUEST_LOGIN_TOKEN_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'db/bluzelleSdk';
import cors from 'cors';
import messages from 'routes/messages';
import login from 'routes/login';
import requestLoginToken from 'routes/request-login-token';

const app = express();
app.use(express.json());
app.use(cors());


initSDK().then((sdk) => {
  app.use(requestLoginToken);
  app.use(login);
  app.use(messages);
}).catch(console.log);



app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});




