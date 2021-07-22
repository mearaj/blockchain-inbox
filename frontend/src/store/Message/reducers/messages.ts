import {MessagesState} from 'store/Message/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {OutboxMessage} from 'api';

// Handled by sendMessageSaga

export const sendMessage = (state: MessagesState, action: PayloadAction<OutboxMessage>) => {
}
