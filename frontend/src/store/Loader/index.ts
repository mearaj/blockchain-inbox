import {createSlice} from '@reduxjs/toolkit';
import {LoaderState} from './interfaces';
import {hideLoader, showLoader, toggleLoader} from './reducers';

const initialState: LoaderState = {
  show: false
};

const loaderSlice = createSlice({
  name: 'loaderState',
  initialState: initialState,
  reducers: {
    showLoader,
    hideLoader,
    toggleLoader
  }
});

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;

export default loaderSlice;

