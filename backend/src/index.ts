import {PORT} from 'config';
import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {initSDK} from 'sdk';

const jsonParser = bodyParser.json();
const app = express();
app.use(jsonParser);


initSDK().then((sdk) => {
  // app.use(registrationRoute);
}).catch(console.log);

app.listen(PORT, () => {
  console.log(`connected to localhost, at port ${PORT}`);
});




