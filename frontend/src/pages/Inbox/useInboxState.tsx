import React, {useEffect, useState} from 'react';
import dataColumns, {inboxColumnFieldsMappings} from './columns';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {GridCellParams, GridColDef} from '@material-ui/data-grid';
import {bluzelleChain} from 'chains';
import {
  getColumnDateCreatedValue,
  getColumnExpiry,
  getColumnFromValue,
  sortColumnByLease,
  sortDateCreated
} from 'utils/columns/common';
import {Button, Typography} from '@material-ui/core';
import {Delete, Schedule} from '@material-ui/icons';
import {getInboxDecryptedMessages} from 'utils/columns/inbox';
import {InboxMessage} from 'api';


const INBOX_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const INBOX_EMPTY = "Your Inbox Is Empty!"

/**
 * The intent of this hook is to separate the state(logic) of the OutboxPage, for better readability of Outbox Page which
 * should mainly focus on UI
 */

export const useInboxState = (): [columns: GridColDef[], getInboxState: string, inboxDecrypted: InboxMessage[] | undefined, warningMdg: string,
] => {
  const [columns, setColumns] = useState(dataColumns);
  const inbox = useSelector((appState: AppState) => appState.messagesState.inbox);
  const inboxLastFetched = useSelector((appState: AppState) => appState.messagesState.inboxLastFetched);
  const getInboxState = useSelector((appState: AppState) => appState.messagesState.getInboxState);
  const [inboxDecrypted, setInboxDecrypted] = useState<InboxMessage[] | undefined>(undefined);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const curiumAccount = useSelector((appState: AppState) => appState.accountsState.curiumAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();

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
    if (currentAccount) {
      getInboxDecryptedMessages(inbox, currentAccount).then(setInboxDecrypted);
    }
    const timerId = setInterval(async () => {
        if (currentAccount) {
          const newDecryptedMsg = await getInboxDecryptedMessages(inbox, currentAccount);
          setInboxDecrypted(newDecryptedMsg);
        }
      }, 1000
    );

    if (inbox.length===0) {
      setInboxDecrypted([]);
      clearInterval(timerId);
      return
    }
    return () => clearInterval(timerId);
  }, [currentAccount, dispatch, inbox])


  useEffect(() => {

    const newColumns = dataColumns.filter((eachColumn) => {
        // shouldInclude intent is to show lease button only when user is logged in with Curium Extension with
        // Bluzelle Account
        let shouldInclude = false;
        switch (eachColumn.field) {
          case inboxColumnFieldsMappings.dateCreated:
            eachColumn.valueGetter = getColumnDateCreatedValue;
            eachColumn.sortComparator = sortDateCreated;
            break;
          case inboxColumnFieldsMappings.renewLease:
            if (currentAccount && curiumAccount) {
              shouldInclude = !!(currentAccount.publicKey===curiumAccount.pubKey &&
                currentAccount.chainName===bluzelleChain.name &&
                window.keplr);
              if (shouldInclude) {
                eachColumn.renderCell = getRenewColumnComponent;
              }
            }
            break;
          case inboxColumnFieldsMappings.expiresAfter:
            eachColumn.sortComparator = sortColumnByLease;
            eachColumn.valueGetter = (params) => {
              return getColumnExpiry(params, inboxLastFetched);
            }
            shouldInclude = true;
            break;
          case inboxColumnFieldsMappings.from:
            eachColumn.valueGetter = getColumnFromValue;
            shouldInclude = true;
            break;
          case inboxColumnFieldsMappings.delete:
            if (currentAccount && curiumAccount) {
              shouldInclude = !!(currentAccount.publicKey===curiumAccount.pubKey &&
                currentAccount.chainName===bluzelleChain.name &&
                window.keplr);
              if (shouldInclude) {
                eachColumn.renderCell = getDeleteColumnComponent;
              }
            }
            break;
          default:
            shouldInclude = true;
        }
        return shouldInclude;
      }
    );
    setColumns(newColumns)
  }, [curiumAccount, currentAccount, inboxLastFetched]);
  return [columns, getInboxState, inboxDecrypted, warningMsg];
}


export default useInboxState;
