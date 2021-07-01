import React, {useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {useTheme} from '@material-ui/core/styles';

import logo from 'assets/png/logo.png';
import clsx from 'clsx';
import {AccountBox, AddBox, PresentToAll, SmsFailed} from '@material-ui/icons';
import {BrowserRouterProps, useHistory, useLocation} from 'react-router-dom';

import useStyles from './styles';
import {Button, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {Dispatch} from 'redux';
import {sidebarActions} from 'store/Sidebar';
import {PayloadAction} from '@reduxjs/toolkit';

interface SidebarProps extends BrowserRouterProps {
}


export const Sidebar = (props: SidebarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const [pathName, setPathName] = useState(location.pathname);


  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const isPathActive = (checkPath: string) => {
    return pathName===checkPath;
  }

  const activeLinkClassName = (checkPath: string): string => {
    return clsx(classes.linkButton, isPathActive(checkPath) ? "active":"");
  }
  const drawer = (
    <div>
      <div className={clsx(classes.toolbar, classes.logoContainer)}>
        <img src={logo} style={{height: 56}} alt="Bluzelle Logo"/>
      </div>
      <Divider/>
      <br/>
      <nav className={classes.nav}>

        <Button
          onClick={() => history.push("/account")}
          size="large"
          className={activeLinkClassName("/account")}
          color="primary"
        >
          <AccountBox className={classes.linkIcon}/>
          <Typography className={classes.linkName}>My Account</Typography>
        </Button>

        <Button
          onClick={() => history.push("/compose")}
          size="large"
          className={activeLinkClassName("/compose")}
          color="primary"
        >
          <AddBox className={classes.linkIcon}/>
          <Typography className={classes.linkName}>
            Compose
          </Typography>
        </Button>

        <Button
          onClick={() => history.push("/inbox")}
          size="large"
          className={activeLinkClassName("/inbox")}
          color="primary"
        >
          <InboxIcon className={classes.linkIcon}/>
          <Typography className={classes.linkName}>
            Inbox
          </Typography>
        </Button>

        <Button
          onClick={() => history.push("/sent")}
          size="large"
          className={activeLinkClassName("/sent")}
          color="primary"
        >
          <PresentToAll className={classes.linkIcon}/>
          <Typography className={classes.linkName}>Sent</Typography>
        </Button>

        <Button
          onClick={() => history.push("/outbox")}
          size="large"
          className={activeLinkClassName("/outbox")}
          color="primary"
        >
          <SmsFailed className={classes.linkIcon}/>
          <Typography className={classes.linkName}>Outbox</Typography>
        </Button>

      </nav>
      <Divider/>
    </div>
  );

  const open = useSelector((state: AppState) => state.sidebarState.open);
  const dispatch = useDispatch<Dispatch<PayloadAction>>();
  const container = window.document.body;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction==='rtl' ? 'right':'left'}
          open={open}
          onClose={() => dispatch<PayloadAction>(sidebarActions.toggleSidebar())}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;
