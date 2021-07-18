import CommonBar from 'components/CommonBar';
import {Accordion, AccordionDetails, AccordionSummary, Button} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import {getAccountsFromCurium, getAccountsFromWallets} from 'store/Account/thunk';

import useStyles from './styles';
import AccountCard from 'components/AccountCard';
import Login from 'components/Login';
import CommonAccordionHeader from 'components/CommonAccordionHeader';


const AccountPage: React.FC = (props) => {
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const {accounts, currentAccount} = accountsState;
    const curiumState = useSelector((state: AppState) => state.curiumState);
    const dispatch = useDispatch();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      //dispatch(accountsActions.setCurrentAccount(value));
      dispatch(getAccountsFromWallets());
    };

    const connectToMetamaskHandler = async () => {
      await (window.ethereum as any).request({method: 'eth_requestAccounts'});
    };

    const connectToCuriumHandler = async () => {
      // const cosmJS = new SigningCosmosClient(
      //   "https://lcd-cosmoshub.keplr.app",
      //   accounts[0].address,
      //   offlineSigner,
      // );
      // const result = await window.keplr.signDirect(
      //   chainId,
      //   accounts[0].address,
      //   {
      //     bodyBytes: new Uint8Array(0),
      //     chainId,
      //   }
      // );
      //await (window.ethereum as any).request({method: 'eth_requestAccounts'});
      dispatch(getAccountsFromCurium());
    };

    return (
      <div className={classes.root}>
        <CommonBar>My Account</CommonBar>
        <Login/>
        <Accordion className={classes.accounts}>
          <CommonAccordionHeader>Accounts</CommonAccordionHeader>

          {
            accounts &&
            <AccordionDetails className={classes.accordionDetails}>
              {
                accounts.map((eachAccount) => (
                  <AccountCard
                    account={eachAccount}
                    key={`${eachAccount.publicKey}:${eachAccount.chainName}`}
                  />
                ))
              }
            </AccordionDetails>
          }
          {
            window.keplr && !curiumState.isConnected &&
            <div>
              <br/>
              <Button onClick={connectToCuriumHandler} color='primary' variant="contained">
                Connect to Curium Extension
              </Button>
              <br/>
            </div>
          }
        </Accordion>
      </div>
    )
  }
;


export default AccountPage;
