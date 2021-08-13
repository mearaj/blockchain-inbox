import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {Message} from 'models/message';

export interface SentMessage extends Message {
    recipientPublicKey: string,
    recipientChainName: string,
    message: string,
    lease: Lease,
    timestamp: number,
    id: string;
}
