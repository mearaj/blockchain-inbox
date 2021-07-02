import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';

const OutboxPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        <CommonBarHeader>
          Outbox
        </CommonBarHeader>
      </CommonBar>
      Theses messages are in the outbox either because the recipient has not yet registered
      or the transaction is pending!.
    </div>
  );
}

export default OutboxPage;
