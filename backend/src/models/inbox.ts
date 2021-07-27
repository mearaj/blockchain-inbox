import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export interface InboxMessage {
  creatorPublicKey: string,
  creatorChainName: string,
  message: string,
  lease: Lease,
  timestamp: number,
  uuid: string;
}
