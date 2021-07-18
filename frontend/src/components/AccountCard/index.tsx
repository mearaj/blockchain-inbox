import {Button, Card, CardContent, Typography} from '@material-ui/core';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountsActions, AppState} from 'store';

import useStyles from './styles';
import clsx from 'clsx';
import {Account} from 'store/Account';
import {BrowserRouterProps} from 'react-router-dom';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import copy from 'copy-to-clipboard';
import {decode, JwtPayload} from 'jsonwebtoken';


export interface AccountCardProps extends BrowserRouterProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = ({account, ...props}) => {
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const {currentAccount} = accountsState;
    const dispatch = useDispatch();
    const touchRef = useRef(null);

    const isLoggedIn = (): boolean => {
      const {exp} = decode(account.auth) as JwtPayload;
      if (exp) {
        return (Date.now() / 1000) < exp;
      }
      return false;
    };

    const isCurrentAccount = (): boolean => {
      return !!(currentAccount?.publicKey &&
        currentAccount.publicKey===account.publicKey &&
        currentAccount.chainName===account.chainName);
    };

    return (
      <Card
        className={
          clsx(classes.account, (account.chainName===currentAccount?.chainName) &&
            (account.publicKey===currentAccount?.publicKey) ? classes.active:""
          )} key={`${account.publicKey}:${account.chainName}`}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.title}>
            <Typography variant="h5">{account.chainName}</Typography>
          </div>
          <div className={classes.publicKeyRow}>
            <Button
              variant="contained" className={clsx(classes.copyButton,
              isCurrentAccount() ? classes.buttonPrimary:classes.buttonSecondary)}
              onClick={() => {
                copy(account.publicKey);
              }}
            >
              Copy Public Key
            </Button>
            <div className={classes.publicKeyContainer}>
              <span className={classes.publicKey}>{account.publicKey}</span>
            </div>
          </div>
          <div className={classes.footerRow}>
            {
              isLoggedIn() ?
                <Button
                  variant="contained" className={clsx(isCurrentAccount() ? classes.buttonPrimary:classes.buttonSecondary)}
                >
                  Logout
                </Button>:
                <Button variant="contained" className={classes.buttonPrimary}>
                  Login
                </Button>
            }
            {
              isCurrentAccount() ? null:
                <Button
                  variant="contained" className={classes.buttonSecondary}
                  onClick={() => {
                    (touchRef.current as any).start();
                    setTimeout(() => (touchRef.current as any).stop({}), 0);
                    dispatch(accountsActions.setCurrentAccount(account));
                  }}
                >Set Current Account</Button>
            }
          </div>
        </CardContent>
        <TouchRipple ref={touchRef}/>
      </Card>
    );
  }
;


export default AccountCard;
