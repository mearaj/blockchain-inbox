import {Card, CardContent} from '@material-ui/core';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';

import useStyles from './styles';
import clsx from 'clsx';
import {accountsActions} from 'store/Account';
import {BrowserRouterProps} from 'react-router-dom';
import {Account} from 'store/Account/account';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';


export interface AccountCardProps extends BrowserRouterProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = ({account, ...props}) => {
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const {currentAccount} = accountsState;
    const dispatch = useDispatch();
    const touchRef = useRef(null);


    return (
      <Card
        className={
          clsx(classes.accountCard, (account.chainName===currentAccount?.chainName) &&
            (account.publicKey===currentAccount?.publicKey) ? classes.active:""
          )} key={`${account.publicKey}:${account.chainName}`}
        onClick={() => {
          dispatch(accountsActions.setCurrentAccount(account));
          (touchRef.current as any).start();
          setTimeout(()=> (touchRef.current as any).stop({}), 500)
        }}
      >
        <CardContent>
          <div>ChainName: {account.chainName}</div>
          <div>
            Public Key
            {account.publicKey.substr(0, 5)}...
            {account.publicKey.substr(account.publicKey.length - 5, 5)}
          </div>
        </CardContent>
        <TouchRipple  ref={touchRef}/>
      </Card>
    );
  }
;


export default AccountCard;
