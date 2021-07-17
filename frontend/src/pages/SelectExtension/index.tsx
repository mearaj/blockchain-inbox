import CommonBar from 'components/CommonBar';
import {Button, Typography} from '@material-ui/core';
import React from 'react';


const SelectExtensionPage: React.FC = (props) => {
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
    </div>
  )
}


export default SelectExtensionPage
