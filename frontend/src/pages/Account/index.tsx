import CommonBar from 'components/CommonBar';
import {Button, Card, CardContent, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonBarHeader from 'components/CommonBarHeader';
import {accountsActions} from 'store/Account';
import {getAccountsFromCurium, getAccountsFromMetaMask, getAccountsFromWallets} from 'store/Account/thunk';
import CommonCardHeader from 'components/CommonCardHeader';
import {WalletNameEnum} from 'store/Account/account';
import theme from 'styles/theme';



const AccountPage: React.FC = (props) => {
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {accounts, currentAccount} = accountsState;
  const metamaskState = useSelector((state: AppState) => state.metamaskState);
  const curiumState = useSelector((state: AppState) => state.curiumState);
  const dispatch = useDispatch();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(accountsActions.setCurrentAccount(value));
    dispatch(getAccountsFromWallets());
  };

  const connectToMetamaskHandler = async () => {
    await (window.ethereum as any).request({method: 'eth_requestAccounts'});
    dispatch(getAccountsFromMetaMask());
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
    <div>
      <CommonBar>
        <CommonBarHeader>
          My Account
        </CommonBarHeader>
      </CommonBar>
      {
        accounts &&
        <Card>
          <CommonCardHeader/>
          <CardContent>
            <RadioGroup value={currentAccount} onChange={handleChange}>
              {
                Object.keys(accounts).map((publicAdd: string) => {
                  return (
                    <Button
                      key={publicAdd}
                      style={
                        {
                          display: 'flex',
                          width: '100%',
                          backgroundColor: accounts[publicAdd].wallet===WalletNameEnum.CURIUM_EXTENSION_WALLET ?
                            theme.palette.common.colorBluzelle:theme.palette.common.colorMetamask,
                          marginBottom: 12,
                          justifyContent: 'flex-start',
                          borderRadius: 4,
                          padding: 0,
                        }
                      }
                    >
                      <Radio
                        value={publicAdd}
                        id={publicAdd}
                        style={{
                          color: "white",
                          backgroundColor: accounts[publicAdd].wallet===WalletNameEnum.CURIUM_EXTENSION_WALLET ?
                            theme.palette.common.colorBluzelle:theme.palette.common.colorMetamask,
                        }}
                      />
                      <FormLabel
                        htmlFor={publicAdd}
                        style={
                          {
                            color: 'white',
                            fontWeight: 700,
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            paddingRight: 12,
                          }
                        }
                      >
                        <span>{accounts[publicAdd].publicAddress}</span>
                        <span style={{marginLeft: 'auto', display: 'inline-flex', color: 'white'}}>
                          {accounts[publicAdd].wallet}
                        </span>
                      </FormLabel>
                    </Button>
                  );
                })
              }
            </RadioGroup>
          </CardContent>
        </Card>
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
        window.keplr && !curiumState.isConnected &&
        <div>
          <br/>
          <Button onClick={connectToCuriumHandler} color='primary' variant="contained">
            Connect to Curium Extension
          </Button>
          <br/>
        </div>
      }
      {
        window.ethereum && !metamaskState.isConnected &&
        <div>
          <br/>
          <Button onClick={connectToMetamaskHandler} color='primary' variant="contained">
            Connect to Metamask Extension
          </Button>
          <br/>
        </div>
      }
    </div>
  )
};


export default AccountPage;
