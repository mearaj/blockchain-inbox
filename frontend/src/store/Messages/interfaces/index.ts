import {InboxMessage, OutboxMessage} from 'api';
import {messagesAction} from 'store/Messages/reducers';

export interface MessagesState {
  sendMessageState: string,
  inbox: InboxMessage[],
  outbox: OutboxMessage[],
  sent: string,
}
