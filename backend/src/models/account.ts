// 1. Create an interface representing a document in MongoDB.
import {model, Schema} from 'mongoose';

export interface Account {
  publicKey: string;
  chainName: string;
}

// 2. Create a Schema corresponding to the document interface.
const accountSchema = new Schema<Account>({
  publicKey: {
    type: String,
    required: true,
    unique:true,
    minLength: 10,
  },
  chainName: {
    type: String,
    required: true,
    minLength: 1,
  },
});


// 3. Create a Model.
export const AccountModel = model<Account>('Account', accountSchema);

