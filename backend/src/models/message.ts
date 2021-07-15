import {Schema} from 'mongoose';

export interface Message {
  creatorPublicKey: string,
  creatorChainName: string,
  creatorEncryptedMessage: string,
  recipientPublicKey: string,
  recipientChainName: string,
  recipientEncryptedMessage: string,
  timestamp: number,
}

export const messageSchema = new Schema<Message>(
  {
    creatorPublicKey: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    creatorChainName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    recipientPublicKey: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    recipientChainName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    timestamp: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minLength:1,
    },
  }
)

