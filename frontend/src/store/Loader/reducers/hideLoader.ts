import {LoaderState} from 'store/Loader/interfaces';

export const hideLoader = (state: LoaderState) => {
  state.show = false;
}
