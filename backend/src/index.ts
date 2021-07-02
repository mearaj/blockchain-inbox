import {PORT} from 'config';
import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {initSDK} from 'sdk';

const app = express();


initSDK().then((sdk) => {
  // app.use(registrationRoute);
}).catch(console.log);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});




