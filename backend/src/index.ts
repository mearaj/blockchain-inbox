import {PORT, TOKENS_ENDPOINT} from 'config';
import express from 'express';
import {initSDK} from 'db/bluzelleSdk';
import cors from 'cors';
import messages from 'routes/outbox';
import login from 'routes/login';
import token from 'routes/tokens';
import {initMongodb} from 'db/mongoose';

const app = express();
app.use(express.json());
app.use(cors());


initSDK().then(async (sdk) => {
  await initMongodb();
  app.use(token);
  app.use(login);
  app.use(messages);
}).catch(console.log);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});



