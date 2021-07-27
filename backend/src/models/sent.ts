import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export interface SentMessage {
  recipientPublicKey: string,
  recipientChainName: string,
  message: string,
  lease: Lease,
  timestamp: number,
  uuid: string;
}
