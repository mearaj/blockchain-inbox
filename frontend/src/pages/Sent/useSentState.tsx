import React, {ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {SentMessage} from 'api';
import {
  getColumnDateCreatedValue,
  getColumnExpiry,
  getColumnToValue,
  sortColumnByLease,
  sortDateCreated
} from 'utils/columns/common';
import {GridCellParams, GridColDef} from '@material-ui/data-grid';
import dataColumns, {sentColumnFieldsMappings} from './columns';
import getSentDecryptedMessages from 'utils/columns/sent/getSentDecryptedMessages';
import {Button, Typography} from '@material-ui/core';
import {Delete, Schedule} from '@material-ui/icons';

const SENT_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const SENT_EMPTY = "Your Sent Is Empty!"

export type RenderRenewCell = (params: GridCellParams) => ReactNode

const getRenewColumnComponent = (_params: GridCellParams) => {
  return <Button color="secondary" variant="contained">
    <Schedule/>
    <Typography style={{marginLeft: 6}}>Renew</Typography>
  </Button>
};

const getDeleteColumnComponent = (_params: GridCellParams) => {
  return <Button color="inherit" variant="contained">
    <Delete/>
    <Typography style={{marginLeft: 6}}>Delete</Typography>
  </Button>
};


export const useSentState = (): [columns: GridColDef[], getSentState: string, sentDecrypted: SentMessage[] | undefined, warningMdg: string] => {
  const [columns, setColumns] = useState(dataColumns);
  const sent = useSelector((appState: AppState) => appState.messagesState.sent);
  const sentLastFetched = useSelector((appState: AppState) => appState.messagesState.sentLastFetched);
  const getSentState = useSelector((appState: AppState) => appState.messagesState.getSentState);
  const [sentDecrypted, setSentDecrypted] = useState<SentMessage[] | undefined>(undefined);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();

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
    if (currentAccount) {
      getSentDecryptedMessages(sent, currentAccount).then(setSentDecrypted);
    }
    const intervalId = setInterval(async () => {
        if (currentAccount) {
          const sentDecryptedMessages = await getSentDecryptedMessages(sent, currentAccount);
          setSentDecrypted(sentDecryptedMessages);
        }
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


  useEffect(() => {
    const newColumns = dataColumns.map((eachColumn) => {
        switch (eachColumn.field) {
          case sentColumnFieldsMappings.to:
            eachColumn.valueGetter = getColumnToValue;
            break;
          case sentColumnFieldsMappings.dateCreated:
            eachColumn.valueGetter = getColumnDateCreatedValue;
            eachColumn.sortComparator = sortDateCreated;
            break;
          case sentColumnFieldsMappings.expiresAfter:
            eachColumn.valueGetter = (params) => {
              return getColumnExpiry(params, sentLastFetched);
            }
            eachColumn.sortComparator = sortColumnByLease;
            break;
          case sentColumnFieldsMappings.renewLease:
            eachColumn.renderCell = getRenewColumnComponent;
            break;
          case sentColumnFieldsMappings.delete:
            eachColumn.renderCell = getDeleteColumnComponent;
            break;

        }
        return eachColumn;
      }
    );
    setColumns(newColumns)
  }, [currentAccount, sentLastFetched]);

  return [columns, getSentState, sentDecrypted, warningMsg];
}

export default useSentState;
