import React, * as React$1 from 'react';
import {useCallback, useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {InboxMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import {bluzelleChain, getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid, GridCellParams, GridRowParams} from '@material-ui/data-grid';
import dataColumns from 'pages/Inbox/data';
import LoginRequired from 'guards/LoginRequired';
import {useHistory} from 'react-router-dom';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getExpiryFromTimestampLease} from 'utils/helpers/getExpiryFromTimestampLease';

const INBOX_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const INBOX_EMPTY = "Your Inbox Is Empty!"

const InboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState(dataColumns);
  const inbox = useSelector((appState: AppState) => appState.messagesState.inbox);
  const getInboxState = useSelector((appState: AppState) => appState.messagesState.getInboxState);
  const [inboxDecrypted, setInboxDecrypted] = useState<InboxMessage[] | undefined>(undefined);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const curiumAccount = useSelector((appState: AppState) => appState.accountsState.curiumAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(messagesAction.getInbox());
  }, [dispatch]);

  useEffect(() => {
    if (getInboxState===messagesAction.getInboxFailure.type && warningMsg!==INBOX_ERROR_BACKEND) {
      setWarningMsg(INBOX_ERROR_BACKEND);
    } else if (inbox.length===0 &&
      getInboxState===messagesAction.getInboxSuccess.type &&
      warningMsg!==INBOX_EMPTY) {
      setWarningMsg(INBOX_EMPTY);
    } else if (inbox.length!==0 && warningMsg!=="") {
      setWarningMsg("");
    }
  }, [inbox, warningMsg, currentAccount, getInboxState]);


  useEffect(() => {
    const timerId = setInterval(async () => {
        if (inbox.length > 0) {
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
          }));
          setInboxDecrypted(inboxDecryptedMessages);
        }
      },
      1000
    );
    if (inbox.length===0) {
      setInboxDecrypted([]);
      clearInterval(timerId);
      return
    }
    return () => clearInterval(timerId);
  }, [inbox, currentAccount])

  const onRowClickHandler = (param: GridRowParams, event: React$1.MouseEvent) => {
    const inboxDetail = param.row as InboxMessage;
    dispatch(messagesAction.setInboxMsgDetail(inboxDetail));
    history.push('/inbox/detail');
  }

  const onCellClick = (params: GridCellParams, event: React$1.MouseEvent) => {
    if (params.field==="renewLease") {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  const getCellClassName = (params: GridCellParams): string => {
    if (params.field==="renewLease") {
      return classes.renewLease;
    }
    return ""
  };

  const getValueFromTimestampLease = useCallback((params: GridCellParams) => {
    const lease: Lease = params.getValue(params.id, 'lease') as Lease;
    const timestamp = params.getValue(params.id, 'timestamp') as number;
    const expiryInString = getExpiryFromTimestampLease(timestamp, lease);
    if (expiryInString[0]==="-") {
      return "Expired!"
    }

    return expiryInString;
  }, []);

  useEffect(() => {
    const newColumns = dataColumns.filter((eachColumn) => {
        let shouldInclude = false;
        if (eachColumn.field==="renewLease") {
          if (currentAccount && curiumAccount) {
            const publicKey = Buffer.from(curiumAccount.pubKey).toString('hex');
            shouldInclude = !!(currentAccount.publicKey===publicKey &&
              currentAccount.chainName===bluzelleChain.name &&
              window.keplr);
          }
        } else {
          shouldInclude = true;
        }
        if (eachColumn.field === "expiresAfter") {
          eachColumn.valueGetter = getValueFromTimestampLease;
        }
        return shouldInclude;
      }
    );
    setColumns(newColumns)
  }, [curiumAccount, currentAccount, getValueFromTimestampLease]);

  return (
    <LoginRequired>
      <div className={classes.root}>
        <CommonBar>Inbox</CommonBar>
        {
          getInboxState===messagesAction.getInboxPending.type &&
          <div className={classes.loader}>
            <CircularProgress/>
          </div>
        },
        {
          (getInboxState!==messagesAction.getInboxPending.type || !inboxDecrypted) &&
          <div className={classes.emptyContainer}>
            <div className={classes.emptyTitle}>
              <Typography variant="h6">{warningMsg}</Typography>
            </div>
          </div>
        }
        {
          getInboxState!==messagesAction.getInboxPending.type &&
          inboxDecrypted &&
          inboxDecrypted.length!==0 &&
          <DataGrid
            className={classes.dataGrid}
            rows={inboxDecrypted}
            columns={columns}
            hideFooterRowCount
            hideFooterSelectedRowCount
            disableSelectionOnClick
            showCellRightBorder
            showColumnRightBorder
            onRowClick={onRowClickHandler}
            scrollbarSize={0}
            onCellClick={onCellClick}
            getCellClassName={getCellClassName}
          />
        }
      </div>
    </LoginRequired>
  );
}

export default InboxPage;
