import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';

const InboxPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>Inbox Header</CommonBar>
      Inbox Page
    </div>
  );
}

export default InboxPage;
