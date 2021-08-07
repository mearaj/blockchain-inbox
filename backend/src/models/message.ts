import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export type MessageType = "inbox" | "sent" | "outbox"

export interface Message {
  message: string,
  lease: Lease,
  timestamp: number,
  id: string;
}
