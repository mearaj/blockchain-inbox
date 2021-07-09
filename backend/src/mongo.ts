// import {MongoClient, MongoError} from 'mongodb';
// import {MONGO_URI} from 'config';
//
// const mongoClient = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoClient.connect((err: MongoError, client) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected Successfully....");
//   const db = client.db();
//   db.collection('users').insertOne({
//     name: "Mearaj"
//   });
//   return
// });

export {};
