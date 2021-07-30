import React, {useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {SentMessage} from 'api';
import {Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid} from '@material-ui/data-grid';
import columns from 'pages/Sent/interfaces';

const SentPage: React.FC = () => {
  const classes = useStyles();
  const sent = useSelector((appState: AppState) => appState.messagesState.sent);
  const [sentDecrypted, setSentDecrypted] = useState<SentMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getSent());
    });
    return () => clearTimeout(timerId);
  }, [dispatch]);

  // The intent is to show empty message for at least few moments for smooth ui interaction
  useEffect(()=> {
    const timerId = setTimeout(()=> {
      setWarningMsg("Your Sent Is Empty!")
    }, 500);
    return ()=> clearTimeout(timerId);
  },[]);


  useEffect(() => {
    const timerId = setTimeout(async () => {
        const sentDecryptedMessages = await Promise.all(sent.map(async (eachSent) => {
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
        setSentDecrypted(sentDecryptedMessages);
      }
    );
    return () => clearTimeout(timerId);
  }, [sent,currentAccount])

  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>Sent</CommonBar>
          {
            sentDecrypted.length===0 &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }
          {
            sentDecrypted.length!==0 &&
            <DataGrid
              className={classes.dataGrid}
              rows={sentDecrypted}
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
