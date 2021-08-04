import React from 'react';
import {loaderActions} from 'store/Loader';
import {Backdrop, CircularProgress} from '@material-ui/core';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';

const GlobalLoader: React.FC = () => {
  const classes = useStyles();

  const loaderState = useSelector((state: AppState) => state.loaderState);
  const dispatch = useDispatch();

  return (
    <>
      {
        loaderState.show &&
        <Backdrop
          className={classes.root}
          onClick={() => dispatch(loaderActions.hideLoader())} open={loaderState.show}
        >
          <CircularProgress/>
        </Backdrop>
      }
    </>
  )
}


export default GlobalLoader;
