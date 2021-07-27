import React, {useEffect, useRef, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {InboxMessage} from 'api';
import clsx from 'clsx';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import {getLeaseString} from 'utils/helpers';
import LoginRequired from 'guards/LoginRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {Typography} from '@material-ui/core';

const InboxPage: React.FC = () => {
  const classes = useStyles();
  const inbox = useSelector((appState: AppState) => appState.messagesState.inbox);
  const [inboxDecrypted, setInboxDecrypted] = useState<InboxMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getInbox());
    });
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    const timerId = setTimeout(async () => {
        const inboxDecryptedPromise = Promise.all(inbox.map(async (eachMessage) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachMessage.message,
              );
              return {
                ...eachMessage,
                message: eachMessageObject.decryptedMessage,
              }
            } catch (e) {
              console.log(e);
              return eachMessage
            }
          })
        );
        const inboxDecryptedMessages = await inboxDecryptedPromise;
        setInboxDecrypted(inboxDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [inbox])

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
            {eachInbox.message}
          </div>
          <div className={classes.column}>
            {getLeaseString(eachInbox.lease)}
          </div>
          <TouchRipple ref={touchRipple}/>
        </div>
      )
    }
    return <RowComponent key={eachInbox.id}/>;
  }

  return (
    <LoginRequired>
      <div className={classes.root}>
        <CommonBar>Inbox</CommonBar>
        {
          inboxDecrypted &&
          inboxDecrypted.length!=0 &&
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
          inboxDecrypted.length===0 &&
          <div className={classes.emptyContainer}>
            <div className={classes.emptyTitle}>
              <Typography variant="h6">Your Inbox Is Empty!</Typography>
            </div>
          </div>
        }
        {
          inboxDecrypted.map((eachInbox: InboxMessage) => {
            return getRowComponent(eachInbox);
          })
        }
      </div>
    </LoginRequired>
  );
}

export default InboxPage;
