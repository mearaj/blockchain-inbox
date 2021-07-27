import React, {useEffect, useRef, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {SentMessage} from 'api';
import clsx from 'clsx';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import {getLeaseString} from 'utils/helpers';
import {Card} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';

const SentPage: React.FC = () => {
  const classes = useStyles();
  const sent = useSelector((appState: AppState) => appState.messagesState.sent);
  const [sentDecrypted, setSentDecrypted] = useState<SentMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getSent());
    });
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
        const sentDecryptedPromise = Promise.all(sent.map(async (eachSent) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachSent.message
              );
              return {
                ...eachSent,
                message: eachMessageObject.decryptedMessage,
              }
            } catch (e) {
              console.log(e);
              return eachSent
            }
          })
        );
        const sentDecryptedMessages = await sentDecryptedPromise;
        setSentDecrypted(sentDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [sent])

  const getRowComponent = (eachSent: SentMessage) => {
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
            {eachSent.recipientChainName} {eachSent.recipientPublicKey}
          </div>
          <div className={classes.column}>
            {eachSent.message}
          </div>
          <div className={classes.column}>
            {getLeaseString(eachSent.lease)}
          </div>
          <TouchRipple ref={touchRipple}/>
        </Card>
      )
    }
    return <RowComponent key={eachSent.uuid}/>;
  }


  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>Sent</CommonBar>
          {
            sentDecrypted &&
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
            sentDecrypted.map((eachSent: SentMessage) => {
              return getRowComponent(eachSent);
            })
          }
        </div>
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default SentPage;
