import React, {useEffect, useRef, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {OutboxMessage} from 'api';
import clsx from 'clsx';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import {getLeaseString} from 'utils/helpers';
import {Card} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';

const OutboxPage: React.FC = () => {
  const classes = useStyles();
  const outbox = useSelector((appState: AppState) => appState.messagesState.outbox);
  const [outboxDecrypted, setOutboxDecrypted] = useState<OutboxMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getOutbox());
    });
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
        const outboxDecryptedPromise = Promise.all(outbox.map(async (eachOutbox) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachOutbox.creatorEncryptedMessage
              );
              return {
                ...eachOutbox,
                message: eachMessageObject.decryptedMessage,
              }
            } catch (e) {
              console.log(e);
              return eachOutbox
            }
          })
        );
        const outboxDecryptedMessages = await outboxDecryptedPromise;
        setOutboxDecrypted(outboxDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [outbox])

  const getRowComponent = (eachOutbox: OutboxMessage) => {
    const RowComponent: React.FC = () => {
      const touchRipple = useRef(null);
      return (
        <Card
          onClick={() => {
            (touchRipple?.current as any)?.start();
            setTimeout(() => {
              (touchRipple?.current as any)?.stop({});
            },);
          }}
          className={classes.grid}
        >
          <div className={classes.column}>
            {eachOutbox.recipientChainName} {eachOutbox.creatorPublicKey}
          </div>
          <div className={classes.column}>
            {eachOutbox.message}
          </div>
          <div className={classes.column}>
            {getLeaseString(eachOutbox.lease)}
          </div>
          <TouchRipple ref={touchRipple}/>
        </Card>
      )
    }
    return <RowComponent key={eachOutbox.uuid}/>;
  }


  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>Outbox</CommonBar>
          {
            outboxDecrypted &&
            <div className={clsx(classes.grid, classes.gridHeader)}>
              <div className={clsx(classes.column, classes.columnHeader)}>
                To
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
            outboxDecrypted.map((eachOutbox: OutboxMessage) => {
              return getRowComponent(eachOutbox);
            })
          }
        </div>
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default OutboxPage;
