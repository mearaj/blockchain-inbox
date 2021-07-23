import {InboxMessage, OutboxMessage} from 'api';

export interface MessagesState {
  inbox: InboxMessage[],
  outbox: OutboxMessage[],
  sent: string,
}
