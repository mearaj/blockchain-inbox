import React, {PropsWithChildren} from 'react';
import useStyles from './styles';
import CommonBar from 'components/CommonBar';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import {bluzelleChain} from 'chains';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const LOG_IN_WARNING = "Kindly log in with  Bluzelle Account, for this feature!";
const SWITCH_TO_WARNING = "'Kindly switch to Bluzelle Account, for this feature!'";

const BluzelleAccountRequired: React.FC<PropsWithChildren<any>> = (props) => {
  const classes = useStyles();
  const appState = useSelector((appState: AppState) => appState);
  const {currentAccount, accounts} = appState.accountsState;
  const history = useHistory();

  let title: string = "";
  let isLoggedIn = currentAccount &&
    currentAccount.chainName===bluzelleChain.name;
  if (!isLoggedIn) {
    title = LOG_IN_WARNING
  } else if (accounts && !accounts.find((eachAccount) => eachAccount.chainName===bluzelleChain.name)) {
    title = SWITCH_TO_WARNING;
  }

  return (
    isLoggedIn ?
      props.children:
      <div className={classes.root}>
        <CommonBar>Bluzelle Login Required!</CommonBar>
        <div className={classes.helperText}>{title}</div>
        <Button
          type="button"
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={(_event) => history.push('/account')}
        >
          My Account
        </Button>
      </div>
  );
}

export default BluzelleAccountRequired;
