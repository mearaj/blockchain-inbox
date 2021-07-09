import {connect, model, Schema} from 'mongoose';
import {MONGO_URI} from '../config';


connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// 1. Create an interface representing a document in MongoDB.
interface User {
  publicKey: string;
  networkName: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  publicKey: {
    type: String,
    required: true
  },
  networkName: {
    type: String
  },
});

// 3. Create a Model.
const UserModel = model<User>('User', userSchema);

const user = new UserModel({
  publicKey: 'keyabc',
  networkName: "walletabc"
})
user.save().then(console.log).catch(console.log);


interface Message {
  creator: User,
  recipient: User,
  timestamp: number,
  message: string,
  state: string | 'created' | 'sent fail' | 'no yet approved'
}

const messageSchema = new Schema<Message>(
  {
    creator: {type: UserModel, required: true},
    recipient: {type: String, required: true},
    timestamp: {type: Number, required: true},
    message: {type: String, required: true},
    state: {type: String, required: true},
  }
)

const MessageModel = model('Message', messageSchema);

const message = new MessageModel({
  creatorPublicKey: "creatorPublicKey",
  creatorNetworkName: "",
  recipientPublicKey: "recipientPublicKey",
  recipientPublicAddress: "recipientPublicAddress",
  networkName: "recipientPublicAddress",
  timestamp: Date.now().valueOf(),
  message: 'This is the first message',
  state: "created",
})

message.save().then(console.log).catch(console.log);
