import React, * as React$1 from 'react';
import {useCallback, useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {OutboxMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid, GridCellParams, GridRowParams, GridValueGetterParams} from '@material-ui/data-grid';
import dataColumns from './interfaces';
import {useHistory} from 'react-router-dom';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getExpiryFromTimestampLease} from 'utils/helpers/getExpiryFromTimestampLease';

const OUTBOX_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const OUTBOX_EMPTY = "Your Outbox Is Empty!"

const OutboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState(dataColumns);
  const outbox = useSelector((appState: AppState) => appState.messagesState.outbox);
  const getOutboxState = useSelector((appState: AppState) => appState.messagesState.getOutboxState);
  const [outboxDecrypted, setOutboxDecrypted] = useState<OutboxMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();


  const getColumnToValue = useCallback((params: GridValueGetterParams) => {
    return `${params.getValue(params.id, 'recipientChainName')}  ` +
      `${params.getValue(params.id, 'recipientPublicKey')}`
  }, []);

  const getColumnDateCreatedValue = useCallback((params: GridValueGetterParams) => {
    const timestamp: number = params.getValue(params.id, 'timestamp') as number;
    return `${new Date(timestamp).toDateString()}`
  }, []);

  const getColumnExpiresAfterValue = useCallback((params: GridCellParams) => {
    const lease: Lease = params.getValue(params.id, 'lease') as Lease;
    const timestamp = params.getValue(params.id, 'timestamp') as number;
    const expiryInString = getExpiryFromTimestampLease(timestamp, lease);
    if (expiryInString[0]==="-") {
      return "Expired!"
    }
    return expiryInString;
  }, []);

  useEffect(() => {
    dispatch(messagesAction.getOutbox());
  }, [dispatch]);

  useEffect(() => {
    if (getOutboxState===messagesAction.getOutboxFailure.type && warningMsg!==OUTBOX_ERROR_BACKEND) {
      setWarningMsg(OUTBOX_ERROR_BACKEND);
    } else if (outbox.length===0 &&
      getOutboxState===messagesAction.getOutboxSuccess.type &&
      warningMsg!==OUTBOX_EMPTY) {
      setWarningMsg(OUTBOX_EMPTY);
    } else if (outbox.length!==0 && warningMsg!=="") {
      setWarningMsg("");
    }
  }, [outbox, warningMsg, currentAccount, getOutboxState]);


  useEffect(() => {
    const intervalId = setInterval(async () => {
        const outboxDecryptedMessages = await Promise.all(outbox.map(async (eachOutbox) => {
            try {
              const eachMessageObject = await getDecryptedMessageFromPrivateKey(
                currentAccount!.privateKey,
                currentAccount!.chainName,
                eachOutbox.creatorEncryptedMessage || ""
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
        setOutboxDecrypted(outboxDecryptedMessages);
      },
      1000
    );
    if (outbox.length===0) {
      setOutboxDecrypted([]);
      clearInterval(intervalId);
      return
    }
    return () => clearInterval(intervalId);
  }, [outbox, currentAccount]);

  const onRowClickHandler = (param: GridRowParams, event: React$1.MouseEvent) => {
    const outboxDetail = param.row as OutboxMessage;
    dispatch(messagesAction.setOutboxMsgDetail(outboxDetail));
    history.push('/outbox/detail');
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

  useEffect(() => {
    const newColumns = dataColumns.map((eachColumn) => {
        if (eachColumn.field==="expiresAfter") {
          eachColumn.valueGetter = getColumnExpiresAfterValue;
        }
        if (eachColumn.field==="to") {
          eachColumn.valueGetter = getColumnToValue;
        }
        if (eachColumn.field==="dateCreated") {
          eachColumn.valueGetter = getColumnDateCreatedValue;
        }
        return eachColumn;
      }
    );
    setColumns(newColumns)
  }, [currentAccount,
    getColumnDateCreatedValue,
    getColumnExpiresAfterValue,
    getColumnToValue,
  ]);


  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <div className={classes.root}>
          <CommonBar>Outbox</CommonBar>
          {
            getOutboxState===messagesAction.getOutboxPending.type &&
            <div className={classes.loader}>
              <CircularProgress/>
            </div>
          },
          {
            (getOutboxState!==messagesAction.getOutboxPending.type || !outboxDecrypted) &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }
          {
            getOutboxState!==messagesAction.getOutboxPending.type &&
            outboxDecrypted &&
            outboxDecrypted.length!==0 &&
            <DataGrid
              className={classes.dataGrid}
              rows={outboxDecrypted}
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
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default OutboxPage;
