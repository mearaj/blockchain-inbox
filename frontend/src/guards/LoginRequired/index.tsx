import React, {PropsWithChildren, useEffect, useState} from 'react';
import useStyles from './styles';
import {Button} from '@material-ui/core';
import CommonBar from 'components/CommonBar';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import {useHistory} from 'react-router-dom';
import {isLoggedIn} from 'utils/jwt';

const LoginRequired: React.FC<PropsWithChildren<any>> = (props) => {
  const classes = useStyles();
  const appState = useSelector((appState: AppState) => appState);
  const history = useHistory();
  const {currentAccount} = appState.accountsState;
  const [warningMsg, setWarningMsg] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      const warningMsg = 'You must be logged in to use this feature!';
      setWarningMsg(warningMsg);
    }, 250);
    return () => clearTimeout(timerId);
  }, []);


  // If current account exists and user is logged in, then return child component
  if (currentAccount && isLoggedIn(currentAccount.auth)) {
    return props.children;
  }

  return (
    <div className={classes.root}>
      <CommonBar>Login Required!</CommonBar>
      {
        warningMsg &&
        <>
          <div className={classes.helperText}>{warningMsg}</div>
          <Button
            type="button"
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={(_event) => history.push('/account')}
          >
            My Account
          </Button>
        </>
      }
    </div>
  );
}

export default LoginRequired;
