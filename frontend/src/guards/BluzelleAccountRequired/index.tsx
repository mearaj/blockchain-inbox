import React, {PropsWithChildren, ReactElement} from 'react';
import useStyles from './styles';
import {Button} from '@material-ui/core';
import CommonBar from 'components/CommonBar';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import {bluzelleChain} from 'chains';
import {useHistory, useLocation} from 'react-router-dom';

const BluzelleAccountRequired: React.FC<PropsWithChildren<any>> = (props) => {
  const classes = useStyles();
  const appState = useSelector((appState: AppState) => appState);
  const history = useHistory();
  const {currentAccount, accounts} = appState.accountsState;

  const renderChildren = (title: string) => {
    return (
      <div className={classes.root}>
        <CommonBar>Bluzelle Login Required!</CommonBar>
        <div className={classes.helperText}>{title}</div>
        <Button
          type="button"
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={(event) => history.push('/account')}
        >
          My Account
        </Button>
      </div>
    )
  }

  let warningTitle: string = "";

  let children: ReactElement;

  if (currentAccount && currentAccount.chainName===bluzelleChain.name) {
    children = props.children;
  } else if (accounts && !accounts.find((eachAccount) => eachAccount.chainName===bluzelleChain.name)) {
    warningTitle = 'You must be logged in with Bluzelle Account';
    children = renderChildren(warningTitle);
  } else {
    warningTitle = 'You must switch to Bluzelle Account';
    children = renderChildren(warningTitle);
  }

  return (
    children
  );
}

export default BluzelleAccountRequired;
