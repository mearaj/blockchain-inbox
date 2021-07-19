import {Button, Card, FormLabel, Radio} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountsActions, AppState} from 'store';

import useStyles from './styles';
import clsx from 'clsx';
import {Account} from 'store/Account';
import {BrowserRouterProps} from 'react-router-dom';
import copy from 'copy-to-clipboard';
import {ExpandMore} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {isLoggedIn} from 'utils/jwt';


export interface AccountCardProps extends BrowserRouterProps {
  account: Account,
  className?: string,
}

const AccountCard: React.FC<AccountCardProps> = ({account, ...props}) => {
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const [expanded, setExpanded] = useState(false);
    const {currentAccount} = accountsState;
    const dispatch = useDispatch();
    //const touchRef = useRef(null);

    const isCurrentAccount = (): boolean => {
      return !!(currentAccount?.publicKey &&
        currentAccount.publicKey===account.publicKey &&
        currentAccount.chainName===account.chainName);
    };

    const radioId = account.publicKey + ":" + account.chainName;
    return (
      <Card raised={expanded} className={clsx(classes.root, props.className, isCurrentAccount() ? classes.current:"")}>
        <div className={classes.cardContent}>
          <div className={classes.header}>
            <Radio
              className={clsx(classes.radio, classes.checked)}
              checked={isCurrentAccount()}
              onChange={() => dispatch(accountsActions.setCurrentAccount(account))}
              id={radioId}
            />
            <FormLabel className={classes.label} htmlFor={radioId}>
              <span className={classes.labelChainName}>
                {account.chainName}
              </span>
              <span className={classes.labelPublicKey}>
                {account.publicKey}
              </span>
            </FormLabel>
            <IconButton
              className={clsx(classes.expandedMoreIconButton,
                expanded ? "":classes.expandedMoreIconButtonRotated)}
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandMore className={classes.expandedMoreIcon}/>
            </IconButton>
          </div>

          {
            <div className={expanded ? classes.body:classes.bodyCollapsed}>
              {/*<div className={classes.title}>*/}
              {/*  <Typography variant="h5">{account.chainName}</Typography>*/}
              {/*</div>*/}
              <div className={classes.publicKeyRow}>
                <Button
                  variant="contained"
                  className={classes.copyButton}
                  onClick={() => copy(account.publicKey)}
                >
                  Copy Public Key
                </Button>
                {
                  isLoggedIn(account.auth) ?
                    <Button variant="contained" className={classes.buttonPrimary}>
                      Logout
                    </Button>:
                    <Button variant="contained" className={classes.buttonPrimary}>
                      Login
                    </Button>
                }
              </div>
            </div>
          }
        </div>
        {/*<TouchRipple ref={touchRef}/>*/}
      </Card>
    );
  }
;


export default AccountCard;
