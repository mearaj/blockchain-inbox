import CommonBar from 'components/CommonBar';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Account, accountsActions, AppState} from 'store';
import {getAccountsFromCurium} from 'store/Account/thunk';

import useStyles from './styles';
import Login from 'components/Login';
import AccountsAccordion from 'components/AccountsAccordion';

const AccountPage: React.FC = (props) => {
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const {accounts, currentAccount} = accountsState;
    const curiumState = useSelector((state: AppState) => state.curiumState);
    const dispatch = useDispatch();
    const [loginExpanded, setLoginExpanded] = useState(false);


    const handleLoginAccordionChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
      setLoginExpanded(expanded);
    };

    const handleChange = (account: Account) => {
      dispatch(accountsActions.setCurrentAccount(account));
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
    useEffect(() => {
      setLoginExpanded(false);
    }, [accounts]);

    return (
      <div className={classes.root}>
        <CommonBar>My Account</CommonBar>
        <Login expanded={loginExpanded} onChange={handleLoginAccordionChange} className={classes.login}/>
        {
          <AccountsAccordion/>
        }
      </div>
    )
  }
;

export default AccountPage;
