import CommonBar from 'components/CommonBar';
import {Button, FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonBarHeader from 'components/CommonBarHeader';
import {accountsActions} from 'store/Account';
import {AccountWallet} from 'store/Account/account';
import {manageAccounts} from 'store/Account/thunk';


const AccountPage: React.FC = (props) => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts, currentAccount} = accountsState
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(accountsActions.setCurrentAccount(value));
  };

  const connectToMetamaskHandler = async ()=> {
    await (window.ethereum as any).request({method:'eth_requestAccounts'});
    dispatch(manageAccounts())
  };

  const isMetamaskConnected = Object.keys(accounts).find(
    (account) => accounts[account].wallet === AccountWallet.METAMASK_EXTENSION_WALLET);

  return (
    <div>
      <CommonBar>
        <CommonBarHeader>
          My Account
        </CommonBarHeader>
      </CommonBar>
      {
        accounts &&
        <RadioGroup value={currentAccount} onChange={handleChange}>
          {
            Object.keys(accounts).map((publicAdd: string) => {
              return (
                <FormControlLabel
                  key={publicAdd}
                  value={publicAdd}
                  control={<Radio/>}
                  label={`${publicAdd} (${accounts[publicAdd].wallet})`}
                />
              );
            })
          }
        </RadioGroup>
      }

      {/*<Typography variant="h5">*/}
      {/*  Currently you can login with the either of the extensions*/}
      {/*</Typography>*/}
      {/*<br/>*/}
      {/*<Button disabled={!window.keplr} color="primary" variant="contained">*/}
      {/*  Login with Curium Extension*/}
      {/*</Button>*/}
      {/*<br/>*/}
      {/*<br/>*/}
      {
        !isMetamaskConnected &&
        <Button onClick={connectToMetamaskHandler} color='primary' variant="contained">
          Connect to Metamask Extension
        </Button>
      }
    </div>
  )
}


export default AccountPage;
