import {InboxMessage, OutboxMessage, SentMessage} from 'api';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';


export interface MessagesState {
  sendMessageState: string,
  claimMessageState: string,
  deleteOutboxMessageState: string,
  claimMessageId: string,
  claimMessageSigned: StdSignDoc | undefined,
  claimMessageSignature: StdSignature | undefined,
  inbox: InboxMessage[],
  outbox: OutboxMessage[],
  sent: SentMessage[],
}
