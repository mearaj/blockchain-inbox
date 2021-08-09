import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api/interfaces';

// Handled by sendMessageSaga
export const sendMessage = (_state: MessagesState, _action: PayloadAction<OutboxMessage>) => {
}
