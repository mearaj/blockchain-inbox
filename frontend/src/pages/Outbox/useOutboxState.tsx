import {useEffect, useState} from 'react';
import dataColumns, {outboxColumnFieldsMappings} from 'pages/Outbox/columns';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {OutboxMessage} from 'api';
import {
  getColumnDateCreatedValue,
  getColumnLeaseString,
  getColumnToValue,
  sortColumnByLease,
  sortDateCreated,
} from 'utils/columns/common';
import {getOutboxDecryptedMessages} from 'utils/columns/outbox'
import {GridColDef} from '@material-ui/data-grid';

const OUTBOX_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const OUTBOX_EMPTY = "Your Outbox Is Empty!"

export const useOutboxState = (): [columns: GridColDef[], getOutboxState: string, outboxDecrypted: OutboxMessage[], warningMdg: string] => {
  const [columns, setColumns] = useState<GridColDef[]>(dataColumns);
  const outbox = useSelector((appState: AppState) => appState.messagesState.outbox);
  const getOutboxState = useSelector((appState: AppState) => appState.messagesState.getOutboxState);
  const [outboxDecrypted, setOutboxDecrypted] = useState<OutboxMessage[]>([]);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();

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
    const timeoutId = setTimeout(async () => {
        if (currentAccount) {
          const outboxDecryptedMessages = await getOutboxDecryptedMessages(outbox, currentAccount);
          setOutboxDecrypted(outboxDecryptedMessages);
        }
      }, 1000
    );
    if (outbox.length===0) {
      setOutboxDecrypted([]);
      clearTimeout(timeoutId);
      return
    }
    return () => clearTimeout(timeoutId);
  }, [outbox, currentAccount]);

  useEffect(() => {
    const newColumns = dataColumns.map((eachColumn) => {
        switch (eachColumn.field) {
          case outboxColumnFieldsMappings.to:
            eachColumn.valueGetter = getColumnToValue;
            break;
          case outboxColumnFieldsMappings.dateCreated:
            eachColumn.valueGetter = getColumnDateCreatedValue;
            eachColumn.sortComparator = sortDateCreated;
            break;
          case outboxColumnFieldsMappings.leasePeriod:
            eachColumn.valueGetter = getColumnLeaseString;
            eachColumn.sortComparator = sortColumnByLease;
            break;
          default:
            break;
        }
        return eachColumn;
      }
    );
    setColumns(newColumns)
  }, [currentAccount]);

  return [columns, getOutboxState, outboxDecrypted, warningMsg];
}

export default useOutboxState;
