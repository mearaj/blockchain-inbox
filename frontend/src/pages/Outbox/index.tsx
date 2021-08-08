import React, {MouseEvent} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {messagesAction} from 'store';
import {useDispatch} from 'react-redux';
import {OutboxMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {DataGrid, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from 'react-router-dom';
import useOutboxState from 'pages/Outbox/useOutboxState';

const OutboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getOutboxState, outboxDecrypted, warningMsg] = useOutboxState();
  const dispatch = useDispatch();
  const history = useHistory();


  const onRowClickHandler = (param: GridRowParams, _event?: MouseEvent) => {
    const outboxDetail = param.row as OutboxMessage;
    dispatch(messagesAction.setOutboxMsgDetail(outboxDetail));
    history.push('/outbox/detail');
  }

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
            getOutboxState===messagesAction.getOutboxSuccess.type &&
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
