import {InboxMessage, OutboxMessage, SentMessage} from 'api';
import {AminoSignResponse, StdSignature, StdSignDoc} from '@cosmjs/launchpad';


export interface MessagesState {
  deleteOutboxMessageState: string,
  curiumPaymentState: string,
  curiumPaymentResponse: AminoSignResponse | undefined,
  claimMessageId: string,
  claimMessageSigned: StdSignDoc | undefined,
  claimMessageSignature: StdSignature | undefined,
  inbox: InboxMessage[],
  getInboxState: string,
  inboxMsgDetail: InboxMessage | undefined,
  outbox: OutboxMessage[],
  getOutboxState: string,
  outboxMsgDetail: OutboxMessage | undefined,
  sent: SentMessage[],
  getSentState: string,
  sentMsgDetail: SentMessage | undefined,
}
