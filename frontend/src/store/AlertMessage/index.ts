import {createSlice} from '@reduxjs/toolkit';
import {
  setAlertMessageState
} from './reducers';
import {AlertMessage} from 'store/AlertMessage/interface';

const initialState: AlertMessage = {
  message: '',
  show: false,
  status: ''
};

const alertMessageSlice = createSlice({
  name: 'alertMessageState',
  initialState,
  reducers: {
    setAlertMessageState,
  }
});

export const alertMessageReducer = alertMessageSlice.reducer;
export const alertMessageActions = alertMessageSlice.actions;

export type {AlertMessage};
export default alertMessageSlice;
