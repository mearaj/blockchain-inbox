import {createSlice} from '@reduxjs/toolkit';


export interface LoaderState {
  show: boolean
}

const initialState: LoaderState = {
  show: false
};

const showLoader = (state: LoaderState) => {
  state.show = true;
}

const hideLoader = (state: LoaderState) => {
  state.show = false;
}

const toggleLoader = (state: LoaderState) => {
  state.show = !state.show;
}

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

