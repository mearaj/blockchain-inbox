import {AminoSignResponse, StdSignature, StdSignDoc} from '@cosmjs/launchpad';
import {InboxMessage} from 'api/inbox';
import {OutboxMessage, SentMessage} from 'api/interfaces';


export interface MessagesState {
  deleteOutboxMessageState: string,
  curiumPaymentState: string,
  curiumPaymentResponse: AminoSignResponse | undefined,
  claimMessageId: string,
  claimMessageSigned: StdSignDoc | undefined,
  claimMessageSignature: StdSignature | undefined,
  inbox: InboxMessage[],
  // refers to timestamp in milliseconds relative to successful fetch of inbox, useful for lease countdown
  inboxLastFetched: number,
  // refers to timestamp in milliseconds relative to successful fetch of sent messages, useful for lease countdown
  sentLastFetched: number,
  inboxMsgDetail: InboxMessage | undefined,
  outbox: OutboxMessage[],
  sentMsgDetail: SentMessage | undefined,
  outboxMsgDetail: OutboxMessage | undefined,
  sent: SentMessage[],

  // Here string refers to fetch state ---> pending,failure,success
  getOutboxState: string,
  getSentState: string,
  getInboxState: string,
}
