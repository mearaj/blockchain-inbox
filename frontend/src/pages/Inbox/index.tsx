import React, {useEffect, useRef} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {InboxMessage} from 'api';
import clsx from 'clsx';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import {getLeaseString} from 'utils/helpers';
import LoginRequired from 'guards/LoginRequired';

const InboxPage: React.FC = () => {
  const classes = useStyles();
  const inbox = useSelector((appState: AppState) => appState.messagesState.inbox);

  const getRowComponent = (eachInbox: InboxMessage) => {
    const RowComponent: React.FC = () => {
      const touchRipple = useRef(null);
      return (
        <div
          onClick={() => {
            (touchRipple?.current as any)?.start();
            setTimeout(() => {
              (touchRipple?.current as any)?.stop({});
            }, 250);
          }}
          className={classes.grid}
        >
          <div className={classes.column}>
            {eachInbox.creatorChainName} {eachInbox.creatorPublicKey}
          </div>
          <div className={classes.column}>
            {eachInbox.recipientEncryptedMessage}
          </div>
          <div className={classes.column}>
            {getLeaseString(eachInbox.lease)}
          </div>
          <TouchRipple ref={touchRipple}/>
        </div>
      )
    }
    return <RowComponent key={eachInbox.uuid}/>;
  }

  return (
    <LoginRequired>
      <div className={classes.root}>
        <CommonBar>Inbox</CommonBar>
        {
          inbox &&
          inbox.length!=0 &&
          <div className={clsx(classes.grid, classes.gridHeader)}>
            <div className={clsx(classes.column, classes.columnHeader)}>
              From
            </div>
            <div className={clsx(classes.column, classes.columnHeader)}>
              Message
            </div>
            <div className={clsx(classes.column, classes.columnHeader)}>
              Lease
            </div>
          </div>
        }
        {
          inbox.map((eachInbox: InboxMessage) => {
            return getRowComponent(eachInbox);
          })
        }
      </div>
    </LoginRequired>
  );
}

export default InboxPage;
