import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api';

// Handled by sendMessageSaga
export const sendMessage = (state: MessagesState, action: PayloadAction<OutboxMessage>) => {
}
