import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumExtensionRequired from 'guards/CuriumRequired';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';


const SentPage: React.FC = () => {
  const classes = useStyles();

  return (
    <CuriumExtensionRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>
            Sent
          </CommonBar>
          Sent Page
        </div>
      </BluzelleAccountRequired>
    </CuriumExtensionRequired>
  );
}

export default SentPage;
