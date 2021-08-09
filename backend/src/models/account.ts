import {model, Schema} from 'mongoose';
import {LoginToken} from 'models/token';


// 1. Create an interface representing a document in MongoDB.
export interface Account {
  publicKey: string;
  chainName: string;
  loginTokens: LoginToken[];
  authTokens: string[];
}

// 2. Create a Schema corresponding to the document interface.
const accountSchema = new Schema<Account>({
  publicKey: {
    type: String,
    required: true,
  },
  chainName: {
    type: String,
    required: true,
  },
  loginTokens: [{
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true
    }
  }],
  authTokens: [{
    type: String,
    required: true
  }]
}, {timestamps: true});

accountSchema.index({publicKey: 1, chainName: 1}, {unique: true});


// 3. Create a Model.
export const AccountModel = model<Account>('Account', accountSchema, 'accounts');

