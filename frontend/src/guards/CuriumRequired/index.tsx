import React, {PropsWithChildren, useEffect, useState} from 'react';
import useStyles from './styles';
import {Button} from '@material-ui/core';
import CommonBar from 'components/CommonBar';

const CuriumRequired: React.FC<PropsWithChildren<any>> = (props) => {

  const [curium, setCurium] = useState(window.keplr);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (!curium) {
        if (window.keplr) {
          setCurium(window.keplr);
        }
      } else {
        if (!window.keplr) {
          setCurium(window.keplr);
        }
      }
    }, 250);
    return () => clearInterval(timerId);
  }, [curium]);

  const classes = useStyles();

  return (
    curium ?
      props.children:
      <div className={classes.root}>
        <CommonBar>Curium Required!</CommonBar>
        <div className={classes.helperText}>
            The Curium Browser Extension is required for this feature!
            Kindly refresh/reload this page after installing the extension.
        </div>
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
  )

}

export default CuriumRequired;
