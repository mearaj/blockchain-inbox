import {initSDK} from './config';
import express, {NextFunction, Request, Response} from 'express';
import registrationRoute from './routes/register';

const app = express();
console.log(app);

const uuid = "blockchain-inbox";


initSDK().then((sdk) => {
  app.use('/api/v1/register', registrationRoute);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({message:err.message});
  });
  console.log("app.use");
}).catch(console.log);

const port = process.env.PORT || 8001;
app.listen(port,  () => {
   console.log("connected to localhost");
});

console.log("STARTED ssssssssss");



