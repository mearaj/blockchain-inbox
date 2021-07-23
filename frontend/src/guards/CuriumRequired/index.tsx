import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import useStyles from './styles';
import {Button, CircularProgress} from '@material-ui/core';
import CommonBar from 'components/CommonBar';

const CuriumRequired: React.FC<PropsWithChildren<any>> = (props) => {

  const [curium, setCurium] = useState(window.keplr);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (!curium) {
        if (window.keplr) {
          setCurium(window.keplr);
        }
      }
      setIsLoading(false);
    },);
    return () => clearTimeout(timerId);
  }, []);

  const classes = useStyles();
  let children: ReactElement = props.children;

  if (isLoading) {
    children = <div className={classes.root}>
      <CommonBar>Loading...</CommonBar>
      <CircularProgress/>
    </div>
  } else if (!curium) {
    children = <div className={classes.root}>
      <CommonBar>Curium Browser Extension Required!</CommonBar>
      <div className={classes.helperText}>The Curium Browser Extension is required for this feature!</div>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        href="https://github.com/bluzelle/blz-extension"
        target="_blank"
      >
        Curium Extension
      </Button>
    </div>
  }
  return children;
}

export default CuriumRequired;
