import React from 'react';
import {Button, IconButton, Menu, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import useStyles from './styles';
import AccountsAccordion from 'components/AccountsAccordion';
import {Close} from '@material-ui/icons';
import {BrowserRouterProps, useHistory} from 'react-router-dom';
import clsx from 'clsx';
import Login from 'components/Login';

export interface ButtonMyAccountsProps extends BrowserRouterProps {
  className?: string;
}

export const ButtonMyAccounts: React.FC<ButtonMyAccountsProps> = (props) => {
  const classes = useStyles();
  const className = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const history = useHistory();
  const {accounts} = accountsState;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (accounts && accounts.length!==0) {
      setAnchorEl(event.currentTarget);
    } else {
      history.push('./account');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {
        <Button
          className={clsx(classes.buttonMyAccounts, className)}
          onClick={handleClick}
          variant="contained"
        >
          My Accounts
        </Button>
      }

      {
        accounts &&
        accounts.length!==0 &&
        anchorEl &&
        <Menu
          className={classes.accountsMenu}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className={classes.header}>
            <IconButton
              color="primary"
              className={classes.buttonIconClose}
              onClick={handleClose}
            >
              <Close/>
            </IconButton>
            <Typography variant="h5">
              My Accounts
            </Typography>
            <IconButton
              color="primary"
              className={classes.buttonIconClose}
              onClick={handleClose}
            >
              <Close/>
            </IconButton>
          </div>
          <div className={classes.accountsAccordionContainer}>
            <Login className={classes.login}/>
            <AccountsAccordion/>
          </div>
        </Menu>
      }
    </>
  )
};


export default ButtonMyAccounts;
