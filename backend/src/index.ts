import {PORT} from 'config';
import express from 'express';
import {initSDK} from 'db/bluzelleSdk';
import cors from 'cors';
import outbox from 'routes/outbox';
import login from 'routes/login';
import token from 'routes/token';
import {initMongodb} from 'db/mongoose';
import logout from 'routes/logout';
import inbox from 'routes/inbox';
import claims from 'routes/claim';
import sent from 'routes/sent';

const app = express();
app.use(express.json());
app.use(cors());

const initApp = async () => {
  await initMongodb();
  await initSDK();
  app.use(token);
  app.use(login);
  app.use(logout);
  app.use(outbox);
  app.use(claims);
  app.use(sent);
  app.use(inbox);
}


initApp().then();

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});

export {helpers} from 'chains/common/helpers';
