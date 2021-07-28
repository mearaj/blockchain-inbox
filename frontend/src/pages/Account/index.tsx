import CommonBar from 'components/CommonBar';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppState} from 'store';

import useStyles from './styles';
import Login from 'components/Login';
import AccountsAccordion from 'components/AccountsAccordion';

const AccountPage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts} = accountsState;
  const [loginExpanded, setLoginExpanded] = useState(false);


  const handleLoginAccordionChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
    setLoginExpanded(expanded);
  };

  useEffect(() => {
    setLoginExpanded(false);
  }, [accounts]);

  return (
    <div className={classes.root}>
      <CommonBar>My Account</CommonBar>
      <Login expanded={loginExpanded} onChange={handleLoginAccordionChange} className={classes.login}/>
      <AccountsAccordion/>
    </div>
  );
};


export default AccountPage;
