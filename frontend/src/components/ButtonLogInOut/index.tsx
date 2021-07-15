import React from 'react';
import {Button} from '@material-ui/core';
import {loginWithCurium} from 'store/Account/thunk';
import {WalletNameEnum} from 'store/Account/account';
import {accountsActions} from 'store/Account';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import useStyles from './styles';
import {CHAIN_ID} from 'config';

const ButtonLogInOut: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts, currentAccount} = accountsState;
  const selectedAccount = accounts[currentAccount];
  const isLoggedIn = selectedAccount?.isLoggedIn;
  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    if (accounts[currentAccount]?.wallet===WalletNameEnum.CURIUM_EXTENSION_WALLET) {
      await dispatch(loginWithCurium());
      const result = await window.keplr!.getKey(CHAIN_ID);
      console.log(result);
      console.log(Buffer.from(result.pubKey).toString('hex'));
    }
  };


  const handleLogoutClick = () => {
    dispatch(accountsActions.setAccountState({
      account: currentAccount,
      accountState: {...accounts[currentAccount], isLoggedIn: false, loginToken: ""}
    }));
  }


  let buttonClassName: string;
  let loginOutText: string;
  if (isLoggedIn) {
    loginOutText = "Logout";
  } else {
    loginOutText = "Login"
  }
  if (selectedAccount?.wallet===WalletNameEnum.CURIUM_EXTENSION_WALLET) {
    buttonClassName = classes.buttonCurium;
  } else {
    buttonClassName = classes.buttonMetamask;
  }

  return (
    <>
      {
        isLoggedIn ?
          <Button
            className={buttonClassName}
            onClick={handleLogoutClick}
            variant="contained"
          >
            {loginOutText}
          </Button>:
          <Button
            className={buttonClassName}
            onClick={handleLoginClick}
            variant="contained"
          >
            {loginOutText}
          </Button>
      }
    </>
  )
};

export default ButtonLogInOut;
