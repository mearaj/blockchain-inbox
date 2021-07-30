import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from 'store';

import useStyles from './styles';
import AccountAccordion from 'components/AccountAccordion';

export const AccountsAccordion: React.FC = (props) => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts} = accountsState;

  return (
    <div className={classes.root}>
      {
        accounts &&
        accounts.map((eachAccount) => (
          <AccountAccordion
            account={eachAccount}
            className={classes.accountCard}
            key={`${eachAccount.publicKey}:${eachAccount.chainName}`}
          />))
      }
    </div>
  )
};


export default AccountsAccordion;
