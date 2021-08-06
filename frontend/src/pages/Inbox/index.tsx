import React, {MouseEvent} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {messagesAction} from 'store';
import {useDispatch} from 'react-redux';
import {InboxMessage} from 'api';
import {CircularProgress, Typography} from '@material-ui/core';
import {DataGrid, GridCellParams, GridRowParams} from '@material-ui/data-grid';
import LoginRequired from 'guards/LoginRequired';
import {useHistory} from 'react-router-dom';
import useInboxState from 'pages/Inbox/useInboxState';


const InboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getInboxState, inboxDecrypted, warningMsg] = useInboxState();


  const dispatch = useDispatch();
  const history = useHistory();

  const onRowClickHandler = (param: GridRowParams, event: MouseEvent) => {
    const inboxDetail = param.row as InboxMessage;
    dispatch(messagesAction.setInboxMsgDetail(inboxDetail));
    history.push('/inbox/detail');

  }

  const onCellClick = (params: GridCellParams, event: MouseEvent) => {
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
