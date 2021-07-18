import {AlertMessage} from '../';
import {PayloadAction} from '@reduxjs/toolkit';

export const setAlertMessageState = (state: AlertMessage, action: PayloadAction<AlertMessage>) => {
  state.message = action.payload.message;
  state.show = action.payload.show;
  state.status = action.payload.status;
}
