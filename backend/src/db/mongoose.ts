import {connect, model, Schema} from 'mongoose';
import {MONGO_URI} from './../config';


let mongooseConnection: typeof import('mongoose');
export const initMongodb = async ()=> {
  if (mongooseConnection) {
    return mongooseConnection;
  }
  mongooseConnection = await connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //useUnifiedTopology: true,
  })
  return mongooseConnection
}

initMongodb().then(()=> console.log("mongodbInitialised"));
