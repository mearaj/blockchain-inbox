import React, {useEffect} from 'react';
import Sidebar from 'components/Sidebar';
import InboxPage from 'pages/Inbox';

import {Redirect, Route, Switch} from 'react-router-dom';
import useStyles from './styles';
import ComposePage from 'pages/Compose';
import SentPage from 'pages/Sent';
import AccountPage from 'pages/Account';
import OutboxPage from 'pages/Outbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {loaderActions} from 'store/Loader';

const Pages: React.FC = (props) => {
  const classes = useStyles();

  const handleKeplrAccountChange = () => {
    console.log("handleKeplrAccountChange, Key store in Keplr is changed. You may need to refetch the account info.");
  }


  const loaderState = useSelector((state: AppState) => state.loaderState);
  const dispatch = useDispatch();


  useEffect(() => {
    const timerID = setTimeout(async ()=> {
      window.addEventListener("keplr_keystorechange", handleKeplrAccountChange);
      return () => window.removeEventListener("keplr_keystorechange", handleKeplrAccountChange);
    });
    return ()=> clearTimeout(timerID);
  });

  useEffect(() => {
    const timerId = setTimeout(async () => {
      // const cosmJS = new SigningCosmosClient(
      //   "https://lcd-cosmoshub.keplr.app",
      //   accounts[0].address,
      //   offlineSigner,
      // );
      // const result = await window.keplr.signDirect(
      //   chainId,
      //   accounts[0].address,
      //   {
      //     bodyBytes: new Uint8Array(0),
      //     chainId,
      //   }
      // );
      return () => clearTimeout(timerId);
    }, 0)
  }, []);

  return (
    <div className={classes.root}>
      <Sidebar/>
      <main className={classes.content}>
        <Switch>
          <Route exact path={"/"}><Redirect to="/inbox"/></Route>
          <Route exact path={"/account"} component={AccountPage}/>
          <Route exact path={"/compose"} component={ComposePage}/>
          <Route exact path={"/sent"} component={SentPage}/>
          <Route exact path={"/inbox"} component={InboxPage}/>
          <Route exact path={"/outbox"} component={OutboxPage}/>
          <Route path={"*"}><Redirect to={"/account"}/></Route>
        </Switch>
      </main>
      <Backdrop onClick={() => dispatch(loaderActions.hideLoader())} open={loaderState.show} style={{zIndex: 10000}}>
        <CircularProgress/>
      </Backdrop>
    </div>
  );
}

export default Pages;
