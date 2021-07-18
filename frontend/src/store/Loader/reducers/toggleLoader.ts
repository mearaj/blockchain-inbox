import {LoaderState} from 'store/Loader/interfaces';

export const toggleLoader = (state: LoaderState) => {
  state.show = !state.show;
}
