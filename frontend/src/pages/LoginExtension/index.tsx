import CommonBar from 'components/CommonBar';
import {Button, Typography} from '@material-ui/core';
import React from 'react';


const LoginExtensionPage: React.FC = (props) => {
  const loginWithMetamask = () => {

  };

  const loginWithKeplr = async () => {
    if (!window.keplr) {
      return
    }
    if (window.getOfflineSigner) {
      const chainId = "bluzelleTestNetPublic-22";
      try {
        await window.keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        // const cosmJS = new SigningCosmosClient(
        //   "https://lcd-cosmoshub.keplr.app",
        //   accounts[0].address,
        //   offlineSigner,
        // );
        const result = await window.keplr.signDirect(
          chainId,
          accounts[0].address,
          {
            bodyBytes: new Uint8Array(0),
            chainId,
          }
        );
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <div>
      <CommonBar>
        Login
      </CommonBar>
      <br/>
      <Typography variant="h5">
        Currently you can login with the either of the extensions
      </Typography>
      <br/>
      <Button disabled={!window.keplr} color="primary" variant="contained">
        Login with Curium Extension
      </Button>
      <br/>
      <br/>
      <Button disabled={!window.ethereum} color='primary' variant="contained">
        Login with Metamask Extension
      </Button>
    </div>
  )
}


export default LoginExtensionPage;
