import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {sidebarActions} from 'store/Sidebar';
import ButtonLogInOut from 'components/ButtonLogInOut';

const CommonBar: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
              <ButtonLogInOut/>
            }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}/>
    </>
  );
}
export default CommonBar;
