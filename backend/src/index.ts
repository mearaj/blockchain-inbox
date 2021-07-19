import {PORT, TOKEN_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'db/bluzelleSdk';
import cors from 'cors';
import outbox from 'routes/outbox';
import login from 'routes/login';
import token from 'routes/token';
import {initMongodb} from 'db/mongoose';
import {authGuard} from 'middlewares/auth';

const app = express();
app.use(express.json());
app.use(cors());

const initApp = async () => {
  await initMongodb();
  await initSDK();
  app.use(token);
  app.use(login);
  app.use(outbox);
}


initApp().then();

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});

export {verifyPublicKeyFormat} from 'validators/verifyPublicKeyFormat';
