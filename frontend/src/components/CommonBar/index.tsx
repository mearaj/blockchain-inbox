import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {sidebarActions} from 'store/Sidebar';
import {PayloadAction} from '@reduxjs/toolkit';
import {Button} from '@material-ui/core';
import {AppState} from 'store';
import {accountActions} from 'store/Account';


const CommonBar: React.FC = (props) => {
  const classes = useStyles();
  const accountState = useSelector((state: AppState) => state.accountState);
  const dispatch = useDispatch<Dispatch<PayloadAction>>();

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
          <div style={{display: 'flex', flexGrow: 1, alignItems:'center'}}>
            <div style={{flexGrow: 1}}>
              {props.children}
            </div>
            {
              accountState.isLoggedIn ?
                <Button onClick={() => dispatch(accountActions.logout())} variant="contained">Logout</Button>:
                null
                //<Button onClick={() => dispatch(accountActions.login())} variant="contained">Login</Button>
            }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}/>
    </>
  );
}
export default CommonBar;
