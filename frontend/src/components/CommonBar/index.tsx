import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {sidebarActions} from 'store/Sidebar';
import {Button} from '@material-ui/core';
import {AppState} from 'store';
import {useHistory} from 'react-router-dom';
import {accountsActions} from 'store/Account';
import {loginBluezelle} from 'store/Account/thunk';
import {AccountWallet} from 'store/Account/account';

const CommonBar: React.FC = (props) => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts, currentAccount} = accountsState;
  const dispatch = useDispatch();
  const history = useHistory();


  const handleLoginClick = async () => {
    await dispatch(loginBluezelle());
    if (accounts[currentAccount].wallet === AccountWallet.CURIUM_EXTENSION_WALLET) {
      const result = await window.keplr?.getKey("bluzelleTestNetPublic-22");
      console.log(result);
    }
  };

  const handleLogoutClick = () => {
    dispatch(accountsActions.setAccountState({
      account: currentAccount,
      accountState: {...accounts[currentAccount], isLoggedIn: false, loginToken: ""}
    }));
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(sidebarActions.toggleSidebar())}
            className={classes.menuButton}
          >
            <MenuIcon/>
          </IconButton>
          <div style={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>
            <div style={{flexGrow: 1}}>
              {props.children}
            </div>
            {
              accounts[currentAccount]?.isLoggedIn ?
                <Button onClick={handleLogoutClick} variant="contained">Logout</Button>:
                <Button onClick={handleLoginClick} variant="contained">Login</Button>
            }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}/>
    </>
  );
}
export default CommonBar;
