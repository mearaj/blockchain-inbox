import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {StdSignature, StdSignDoc} from '@cosmjs/amino';

export type MessageType = "inbox" | "sent" | "outbox"

export interface Message {
  message: string,
  lease: Lease,
  timestamp: number,
  id: string;
}

export interface DeleteMessageReqBody {
  id: string;
  signature: StdSignature,
  signed: StdSignDoc,
}
