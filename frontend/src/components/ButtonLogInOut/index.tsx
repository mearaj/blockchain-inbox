import React from 'react';
import {Button} from '@material-ui/core';
import {loginWithCurium} from 'store/Account/thunk';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import useStyles from './styles';
import {CHAIN_ID} from 'config';
import {accountsActions} from 'store/Account/reducers';

const ButtonLogInOut: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts, currentAccount} = accountsState;
  const selectedAccount = currentAccount?.publicKey;
  const auth = currentAccount?.auth;
  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    // if (accounts[currentAccount]?.chainName==="Bluzelle Wallet") {
    //   await dispatch(loginWithCurium());
    //   const result = await window.keplr!.getKey(CHAIN_ID);
    //   console.log(result);
    //   console.log(Buffer.from(result.pubKey).toString('hex'));
    // }
  };


  const handleLogoutClick = () => {
    // dispatch(accountsActions.setAccountState({
    //   account: currentAccount,
    //   accountState: {...accounts[currentAccount], auth: ""}
    // }));
  }

  let loginOutText: string;
  if (auth) {
    loginOutText = "Logout";
  } else {
    loginOutText = "Login"
  }

  return (
    <>
      {
        auth ?
          <Button
            className={classes.buttonCurium}
            onClick={handleLogoutClick}
            variant="contained"
          >
            {loginOutText}
          </Button>:
          <Button
            className={classes.buttonCurium}
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
