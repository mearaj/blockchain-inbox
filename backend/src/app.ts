import {initMongodb} from 'db/mongoose';
import {initSDK} from 'db/bluzelleSdk';
import express, {Express} from 'express';
import cors from 'cors';
import router from 'routes';
import {PORT} from 'config';

let app:Express;

export const startServer = async ():Promise<Express> => {
  if (app) {
    return app;
  }
  await initMongodb();
  await initSDK();
  app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
  });
  return app;
}

export default startServer;
