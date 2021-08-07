import React, {MouseEvent, useState} from 'react';
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
import RenewLeaseDialog from 'dialogs/RenewLease';


const InboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getInboxState, inboxDecrypted, warningMsg] = useInboxState();
  const [messageId, setMessageId] = useState("");
  const [open, setOpen] = React.useState(false);


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
      setMessageId(params.id as string);
      setOpen(true);
    }
  }

  const getCellClassName = (params: GridCellParams): string => {
    if (params.field==="renewLease") {
      return classes.renewLease;
    }
    return ""
  };

  const handleClose = () => {
    setMessageId("");
    setOpen(false);
  }

  return (
    <LoginRequired>
      <RenewLeaseDialog messageId={messageId} type="inbox" handleClose={handleClose} open={open && !!messageId}/>
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
