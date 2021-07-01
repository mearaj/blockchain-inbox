import CommonBar from 'components/CommonBar';
import {Button, Typography} from '@material-ui/core';
import React from 'react';


const SelectExtensionPage: React.FC = (props) => {
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
      <CommonBar/>
      <Typography variant="body1">
        It seems you are not using any browser extension for wallet!
      </Typography>
      <Typography variant="body2">
        The following are the browser extension wallet currently supported
      </Typography>
      <br/>
      <Button color="primary" variant="outlined" href="https://github.com/bluzelle/blz-extension" target="_blank">
        Curium Extension
      </Button>
      <br/>
      <Button color="primary" variant="outlined" href="https://metamask.io/download.html" target="_blank">
        Metamask Extension
      </Button>
    </div>
  )
}


export default SelectExtensionPage
