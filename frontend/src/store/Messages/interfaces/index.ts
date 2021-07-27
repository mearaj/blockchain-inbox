import {ClaimMessage, InboxMessage, OutboxMessage, SentMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';

export interface MessagesState {
  sendMessageState: string,
  claimMessageState: string,
  claimMessageUuid: string,
  claimMessageSigned: StdSignDoc | undefined,
  claimMessageSignature: StdSignature | undefined,
  inbox: InboxMessage[],
  outbox: OutboxMessage[],
  sent: SentMessage[],
}
