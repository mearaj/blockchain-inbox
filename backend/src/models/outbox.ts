import {model, Schema} from 'mongoose';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export interface OutboxMessage {
  creatorPublicKey: string,
  creatorChainName: string,
  creatorEncryptedMessage: string,
  recipientPublicKey: string,
  recipientChainName: string,
  recipientEncryptedMessage: string,
  lease: Lease,
  timestamp: number,
  id: string;
}

export const outboxMessageSchema = new Schema<OutboxMessage>(
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
    creatorEncryptedMessage: {
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
    recipientEncryptedMessage: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    timestamp: {
      type: Number,
      required: false,
    },
    lease: {
      seconds: {
        type: Number,
        required: true
      },
      minutes: {
        type: Number,
        required: true
      },
      hours: {
        type: Number,
        required: true
      },
      days: {
        type: Number,
        required: true
      },
      years: {
        type: Number,
        required: true
      },
    },
    id: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
  }
)
export const OutboxMessageModel = model<OutboxMessage>('Message', outboxMessageSchema, 'outbox');

