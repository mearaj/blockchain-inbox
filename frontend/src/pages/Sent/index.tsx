import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';


const SentPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        <CommonBarHeader>
          Sent
        </CommonBarHeader>
      </CommonBar>
      Sent Page
    </div>
  );
}

export default SentPage;
