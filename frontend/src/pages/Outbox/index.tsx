import React, * as React$1 from 'react';
import {useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import {OutboxMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {DataGrid, GridRowParams} from '@material-ui/data-grid';
import dataColumns, {outboxColumnFieldsMappings} from 'pages/Outbox/columns';
import {useHistory} from 'react-router-dom';
import sortDateCreated from 'utils/columns/common/sortDateCreated';
import {getColumnDateCreatedValue, getColumnToValue} from 'utils/columns/outbox';
import getDecryptedMsgsFromOutbox from 'utils/columns/outbox/getDecryptedMsgsFromOutbox';

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
          const outboxDecryptedMessages = await getDecryptedMsgsFromOutbox(outbox, currentAccount);
          setOutboxDecrypted(outboxDecryptedMessages);
        }
      }, 1000
    );
    // if (outbox.length===0) {
    //   setOutboxDecrypted([]);
    //   clearTimeout(intervalId);
    //   return
    // }
    return () => clearTimeout(timeoutId);
  }, [outbox, currentAccount]);

  const onRowClickHandler = (param: GridRowParams, event: React$1.MouseEvent) => {
    const outboxDetail = param.row as OutboxMessage;
    dispatch(messagesAction.setOutboxMsgDetail(outboxDetail));
    history.push('/outbox/detail');
  }


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
            eachColumn.valueGetter = getColumnDateCreatedValue;
            eachColumn.sortComparator = sortDateCreated;
            break;
          default:
            break;
        }
        return eachColumn;
      }
    );
    setColumns(newColumns)
  }, [currentAccount]);

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
            />
          }
        </div>
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default OutboxPage;
