import {LoaderState} from 'store/Loader/interfaces';

export const showLoader = (state: LoaderState) => {
  state.show = true;
}
