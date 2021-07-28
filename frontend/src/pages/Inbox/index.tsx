import React, {useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {InboxMessage} from 'api';
import {Typography} from '@material-ui/core';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid} from '@material-ui/data-grid';
import columns from './interfaces';
import LoginRequired from 'guards/LoginRequired';

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
  }, [dispatch]);


  useEffect(() => {
    const timerId = setTimeout(async () => {
        const inboxDecryptedMessages = await Promise.all(inbox.map(async (eachInboxMsg) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachInboxMsg.message
              );
              return {
                ...eachInboxMsg,
                message: eachMessageObject.decryptedMessage,
              }
            } catch (e) {
              console.log(e);
              return eachInboxMsg
            }
          })
        );
        setInboxDecrypted(inboxDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [inbox, currentAccount])

  return (
    <LoginRequired>
      <div className={classes.root}>
        <CommonBar>Inbox</CommonBar>
        {
          inboxDecrypted.length===0 &&
          <div className={classes.emptyContainer}>
            <div className={classes.emptyTitle}>
              <Typography variant="h6">Your Inbox Messages Is Empty!</Typography>
            </div>
          </div>
        }
        {
          inboxDecrypted.length!==0 &&
          <DataGrid
            className={classes.dataGrid}
            rows={inboxDecrypted}
            columns={columns}
            disableSelectionOnClick
          />
        }

      </div>
    </LoginRequired>
  );
}

export default InboxPage;
