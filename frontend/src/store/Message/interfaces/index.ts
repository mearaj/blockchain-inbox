import {OutboxMessage} from 'api';

export interface MessagesState {
  inbox: string,
  outbox: OutboxMessage[],
  sent: string,
}
