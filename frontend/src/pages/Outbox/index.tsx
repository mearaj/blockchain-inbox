import React, {useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {OutboxMessage} from 'api';
import {Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid} from '@material-ui/data-grid';
import columns from './interfaces';

const SentPage: React.FC = () => {
  const classes = useStyles();
  const outbox = useSelector((appState: AppState) => appState.messagesState.outbox);
  const [outboxDecrypted, setOutboxDecrypted] = useState<OutboxMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getOutbox());
    });
    return () => clearTimeout(timerId);
  }, [dispatch]);

  // The intent is to show empty message for at least few moments for smooth ui interaction
  useEffect(()=> {
    const timerId = setTimeout(()=> {
      setWarningMsg("Your Outbox Is Empty!")
    }, 500);
    return ()=> clearTimeout(timerId);
  },[]);

  useEffect(() => {
    const timerId = setTimeout(async () => {
        const outboxDecryptedMessages = await Promise.all(outbox.map(async (eachOutboxMsg) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachOutboxMsg.creatorEncryptedMessage
              );
              return {
                ...eachOutboxMsg,
                message: eachMessageObject.decryptedMessage,
              }
            } catch (e) {
              console.log(e);
              return eachOutboxMsg
            }
          })
        );
        setOutboxDecrypted(outboxDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [outbox, currentAccount])

  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>Outbox</CommonBar>
          {
            outboxDecrypted.length===0 &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }
          {
            outboxDecrypted.length!==0 &&
            <DataGrid
              className={classes.dataGrid}
              rows={outboxDecrypted}
              columns={columns}
              disableSelectionOnClick
            />
          }
        </div>
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default SentPage;
