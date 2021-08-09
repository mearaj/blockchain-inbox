import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
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
import {useAccountMatch} from 'hooks/useAccountMatch';
import {SentMessage} from 'api/interfaces';

const SENT_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const SENT_EMPTY = "Your Sent Is Empty!"


/**
 * The intent of this hook is to separate the state(logic) of the SentPage, for better readability of Outbox Page which
 * should mainly focus on UI
 */

export const useSentPageState = (): [columns: GridColDef[], getSentState: string, sentDecrypted: SentMessage[] | undefined, warningMdg: string] => {
  const [columns, setColumns] = useState(dataColumns);
  const sent = useSelector((appState: AppState) => appState.messagesState.sent);
  const sentLastFetched = useSelector((appState: AppState) => appState.messagesState.sentLastFetched);
  const getSentState = useSelector((appState: AppState) => appState.messagesState.getSentState);
  const [sentDecrypted, setSentDecrypted] = useState<SentMessage[] | undefined>(undefined);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();
  const [accountMatchesCurium] = useAccountMatch();

  /**
   * Callback function for material-ui 's data-grid api.
   * This function renders Delete Button inside Delete Column/Cell
   * @param _params
   */
  const getDeleteColumnComponent = (_params: GridCellParams) => {
    return <Button color="inherit" variant="contained">
      <Delete/>
      <Typography style={{marginLeft: 6}}>Delete</Typography>
    </Button>
  };


  /**
   * Callback function for material-ui 's data-grid api.
   * This function renders Renew Button inside Renew Column/Cell
   * @param _params
   */
  const getRenewColumnComponent = (_params: GridCellParams) => {
    return <Button color="secondary" variant="contained">
      <Schedule/>
      <Typography style={{marginLeft: 6}}>Renew</Typography>
    </Button>
  };

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
    const newColumns = dataColumns.filter((eachColumn) => {
      let shouldInclude = true;
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
            shouldInclude = false;
            if (accountMatchesCurium) {
              shouldInclude = accountMatchesCurium;
              eachColumn.renderCell = getRenewColumnComponent;
            }
            break;
          case sentColumnFieldsMappings.delete:
            shouldInclude = false;
            if (accountMatchesCurium) {
              shouldInclude = accountMatchesCurium;
              eachColumn.renderCell = getDeleteColumnComponent;
            }
            break;

        }
        return shouldInclude;
      }
    );
    setColumns(newColumns)
  }, [accountMatchesCurium, currentAccount, sentLastFetched]);

  return [columns, getSentState, sentDecrypted, warningMsg];
}

export default useSentPageState;
