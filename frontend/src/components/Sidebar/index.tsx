import React, {useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {useTheme} from '@material-ui/core/styles';

import logo from 'assets/png/logo.png';
import clsx from 'clsx';
import {AccountBox, AddBox, Person, PresentToAll, SmsFailed} from '@material-ui/icons';
import {BrowserRouterProps, useHistory, useLocation} from 'react-router-dom';

import useStyles from './styles';
import {Button, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {Dispatch} from 'redux';
import {sidebarActions} from 'store/Sidebar';
import {PayloadAction} from '@reduxjs/toolkit';
import LogoFull from 'components/LogoFull';

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
    return pathName.startsWith(checkPath);
  }

  const activeLinkClassName = (checkPath: string): string => {
    return clsx(classes.linkButton, isPathActive(checkPath) ? "active":"");
  }
  const drawer = (
    <div>
      <div className={clsx(classes.toolbar, classes.logoContainer)}>
        <LogoFull/>
      </div>
      <br/>
      <nav className={classes.nav}>

        <Button
          onClick={() => history.push("/account")}
          size="large"
          className={activeLinkClassName("/account")}
        >
          <AccountBox className={classes.linkIcon}/>
          <Typography className={classes.linkName}>My Account</Typography>
        </Button>

        <Button
          onClick={() => history.push("/compose")}
          size="large"
          className={activeLinkClassName("/compose")}
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
        >
          <PresentToAll className={classes.linkIcon}/>
          <Typography className={classes.linkName}>Sent</Typography>
        </Button>

        <Button
          onClick={() => history.push("/outbox")}
          size="large"
          className={activeLinkClassName("/outbox")}
        >
          <SmsFailed className={classes.linkIcon}/>
          <Typography className={classes.linkName}>Outbox</Typography>
        </Button>
      </nav>
    </div>
  );

  const open = useSelector((state: AppState) => state.sidebarState.open);
  const dispatch = useDispatch<Dispatch<PayloadAction>>();
  const container = window.document.body;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
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
      <Hidden  smDown implementation="css">
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
