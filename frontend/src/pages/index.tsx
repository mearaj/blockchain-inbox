import React, {useCallback, useEffect} from 'react';
import Sidebar from 'components/Sidebar';
import InboxPage from 'pages/Inbox';

import {Redirect, Route, Switch} from 'react-router-dom';
import useStyles from './styles';
import ComposePage from 'pages/Compose';
import SentPage from 'pages/Sent';
import AccountPage from 'pages/Account';
import OutboxPage from 'pages/Outbox';
import GlobalLoader from 'components/GlobalLoader';
import SentMsgDetail from 'pages/SentMsgDetail';
import InboxMsgDetail from 'pages/InboxMsgDetail';
import OutboxMsgDetail from 'pages/OutboxMsgDetail';
import {useDispatch, useSelector} from 'react-redux';
import {accountsActions, AppState} from 'store';

const Pages: React.FC = () => {
  const classes = useStyles();
  const currentAccount = useSelector((appState:AppState)=> appState.accountsState.currentAccount);
  const dispatch = useDispatch();

  const handleKeplrAccountChange = useCallback(() => {
    console.log("handleKeplrAccountChange, Key store in Keplr is changed. You may need to refetch the account info.");
    // The intent of this dispatch is to update App's account because curium account is changed
    if (currentAccount) {
      dispatch(accountsActions.setCurrentAccount({...currentAccount}));
    }
  },[currentAccount, dispatch]);

  useEffect(() => {
    const timerID = setTimeout(async () => {
      window.addEventListener("keplr_keystorechange", handleKeplrAccountChange);
      return () => window.removeEventListener("keplr_keystorechange", handleKeplrAccountChange);
    });
    return () => clearTimeout(timerID);
  },[handleKeplrAccountChange]);

  return (
    <>
      <GlobalLoader/>
      <div className={classes.root}>
        <Sidebar/>
        <main className={classes.content}>
          <Switch>
            <Route exact path={"/"}><Redirect to="/inbox"/></Route>
            <Route exact path={"/account"} component={AccountPage}/>
            <Route exact path={"/compose"} component={ComposePage}/>
            <Route exact path={"/sent"} component={SentPage}/>
            <Route exact path={"/sent/detail"} component={SentMsgDetail}/>
            <Route exact path={"/inbox"} component={InboxPage}/>
            <Route exact path={"/inbox/detail"} component={InboxMsgDetail}/>
            <Route exact path={"/outbox"} component={OutboxPage}/>
            <Route exact path={"/outbox/detail"} component={OutboxMsgDetail}/>
            <Route path={"*"}><Redirect to={"/account"}/></Route>
          </Switch>
        </main>
      </div>
    </>
  );
}

export default Pages;
