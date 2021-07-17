import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';


const SentPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        Sent
      </CommonBar>
      Sent Page
    </div>
  );
}

export default SentPage;
