import {ReactNode, useEffect, useState} from 'react';
import dataColumns, {inboxColumnFieldsMappings} from './columns';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {InboxMessage} from 'api';
import {GridCellParams, GridColDef} from '@material-ui/data-grid';
import {bluzelleChain, getDecryptedMessageFromPrivateKey} from 'chains';
import {
  getColumnDateCreatedValue,
  getColumnExpiry,
  getColumnFromValue,
  sortColumnByLease,
  sortDateCreated
} from 'utils/columns/common';


export type RenderRenewCell = (params: GridCellParams) => ReactNode

const INBOX_ERROR_BACKEND = "Sorry, something went wrong. Please try again later"
const INBOX_EMPTY = "Your Inbox Is Empty!"

export const useInboxState = (renderRenewCell: RenderRenewCell): [columns: GridColDef[], getInboxState: string, inboxDecrypted: InboxMessage[] | undefined, warningMdg: string] => {
  const [columns, setColumns] = useState(dataColumns);
  const inbox = useSelector((appState: AppState) => appState.messagesState.inbox);
  const getInboxState = useSelector((appState: AppState) => appState.messagesState.getInboxState);
  const [inboxDecrypted, setInboxDecrypted] = useState<InboxMessage[] | undefined>(undefined);
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const curiumAccount = useSelector((appState: AppState) => appState.accountsState.curiumAccount);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();

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

  useEffect(() => {
    const newColumns = dataColumns.filter((eachColumn) => {
        let shouldInclude = false;
        switch (eachColumn.field) {
          case inboxColumnFieldsMappings.dateCreated:
            eachColumn.valueGetter = getColumnDateCreatedValue;
            eachColumn.sortComparator = sortDateCreated;
            break;
          case inboxColumnFieldsMappings.renewLease:
            if (currentAccount && curiumAccount) {
              const publicKey = Buffer.from(curiumAccount.pubKey).toString('hex');
              shouldInclude = !!(currentAccount.publicKey===publicKey &&
                currentAccount.chainName===bluzelleChain.name &&
                window.keplr);
              if (shouldInclude) {
                eachColumn.renderCell = renderRenewCell;
              }
            }
            break;
          case inboxColumnFieldsMappings.expiresAfter:
            eachColumn.valueGetter = getColumnExpiry;
            eachColumn.sortComparator = sortColumnByLease;
            shouldInclude = true;
            break;
          case inboxColumnFieldsMappings.from:
            eachColumn.valueGetter = getColumnFromValue;
            shouldInclude = true;
            break;
          default:
            shouldInclude = true;
        }
        return shouldInclude;
      }
    );
    setColumns(newColumns)
  }, [curiumAccount, currentAccount, renderRenewCell]);
  return [columns, getInboxState, inboxDecrypted, warningMsg];
}

export default useInboxState;
