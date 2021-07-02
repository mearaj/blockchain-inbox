import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';

const InboxPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        <CommonBarHeader>
          Inbox Header
        </CommonBarHeader>
      </CommonBar>
      Inbox Page
    </div>
  );
}

export default InboxPage;
