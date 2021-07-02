import CommonBar from 'components/CommonBar';
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {accountActions} from 'store/Account';


const LoginExtensionPage: React.FC = (props) => {
  const accounts = useSelector((state: AppState) => state.accountsState);
  const account = useSelector((state: AppState) => state.accountState);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const account = accounts[(event.target as HTMLInputElement).value];
    dispatch(accountActions.updateAccountState(account));
  };
  console.log(accounts);
  console.log(account);

  return (
    <div>
      <CommonBar>
        Login
      </CommonBar>
      <br/>
      {
        accounts &&
        <RadioGroup value={account.publicAddress} onChange={handleChange}>
          {
            Object.keys(accounts).map((publicAdd: string) => {
              return (
                <FormControlLabel
                  key={publicAdd}
                  value={publicAdd}
                  control={<Radio />}
                  label={`${account.publicAddress} (${account.wallet})`} />
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
      {/*<Button disabled={!window.ethereum} color='primary' variant="contained">*/}
      {/*  Login with Metamask Extension*/}
      {/*</Button>*/}
    </div>
  )
}


export default LoginExtensionPage;
