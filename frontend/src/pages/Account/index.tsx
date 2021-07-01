import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';

const AccountPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        My Account Header
      </CommonBar>
      My Account Page
    </div>
  );
}

export default AccountPage;
