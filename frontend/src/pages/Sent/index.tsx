import React, * as React$1 from 'react';
import {useCallback, useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {SentMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {getDecryptedMessageFromPrivateKey} from 'chains';
import {DataGrid, GridCellParams, GridRowParams, GridValueGetterParams} from '@material-ui/data-grid';
import dataColumns from './interfaces';
import {useHistory} from 'react-router-dom';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getExpiryFromTimestampLease} from 'utils/helpers/getExpiryFromTimestampLease';

const SENT_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const SENT_EMPTY = "Your Sent Is Empty!"

const SentPage: React.FC = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState(dataColumns);
  const sent = useSelector((appState: AppState) => appState.messagesState.sent);
  const getSentState = useSelector((appState: AppState) => appState.messagesState.getSentState);
  const [sentDecrypted, setSentDecrypted] = useState<SentMessage[]>([]);
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

  const getColumnExpiresAfterValue = useCallback((params) => {
    const lease: Lease = params.getValue(params.id, 'lease') as Lease;
    const timestamp = params.getValue(params.id, 'timestamp') as number;
    const expiryInString = getExpiryFromTimestampLease(timestamp, lease);
    console.log("This should be reached")
    if (expiryInString[0]==="-") {
      return "Expired!"
    }

    return expiryInString;
  }, [])

  useEffect(() => {
    dispatch(messagesAction.getSent());
  }, [dispatch]);

  useEffect(() => {
    if (getSentState===messagesAction.getSentFailure.type && warningMsg!==SENT_ERROR_BACKEND) {
      setWarningMsg(SENT_ERROR_BACKEND);
    } else if (sent.length===0 &&
      getSentState===messagesAction.getSentSuccess.type &&
      warningMsg!==SENT_EMPTY) {
      setWarningMsg(SENT_EMPTY);
    } else if (sent.length!==0 && warningMsg!=="") {
      setWarningMsg("");
    }
  }, [sent, warningMsg, currentAccount, getSentState]);


  useEffect(() => {
    const intervalId = setInterval(async () => {
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
      },
      1000
    );
    if (sent.length===0) {
      setSentDecrypted([]);
      clearInterval(intervalId);
      return
    }
    return () => clearInterval(intervalId);
  }, [sent, currentAccount]);

  const onRowClickHandler = (param: GridRowParams, event: React$1.MouseEvent) => {
    const sentDetail = param.row as SentMessage;
    dispatch(messagesAction.setSentMsgDetail(sentDetail));
    history.push('/sent/detail');
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
          <CommonBar>Sent</CommonBar>
          {
            getSentState===messagesAction.getSentPending.type &&
            <div className={classes.loader}>
              <CircularProgress/>
            </div>
          },
          {
            (getSentState!==messagesAction.getSentPending.type || !sentDecrypted) &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }
          {
            getSentState!==messagesAction.getSentPending.type &&
            sentDecrypted &&
            sentDecrypted.length!==0 &&
            <DataGrid
              className={classes.dataGrid}
              rows={sentDecrypted}
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

export default SentPage;
