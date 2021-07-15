import {model} from 'mongoose';
import {Message, messageSchema} from 'models/message';

export const OutboxMessageModel = model<Message>('Message', messageSchema, 'outbox');

new TextEncoder().encode()
