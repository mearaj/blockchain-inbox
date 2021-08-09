import React, {MouseEvent, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import {messagesAction} from 'store';
import {useDispatch} from 'react-redux';
import {CircularProgress, Typography} from '@material-ui/core';
import {DataGrid, GridCellParams, GridRowParams} from '@material-ui/data-grid';
import LoginRequired from 'guards/LoginRequired';
import {useHistory} from 'react-router-dom';
import useInboxState from 'pages/Inbox/useInboxState';
import RenewLeaseDialog from 'dialogs/RenewLease';
import {inboxColumnFieldsMappings} from 'pages/Inbox/columns';
import DeleteMessageDialog from 'dialogs/DeleteMessage';
import {InboxMessage} from 'api/inbox';


const InboxPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getInboxState, inboxDecrypted, warningMsg] = useInboxState();
  const [messageId, setMessageId] = useState("");
  const [renewDialogOpen, setRenewDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);


  const dispatch = useDispatch();
  const history = useHistory();

  const onRowClickHandler = (param: GridRowParams, _event: MouseEvent) => {
    const inboxDetail = param.row as InboxMessage;
    dispatch(messagesAction.setInboxMsgDetail(inboxDetail));
    history.push('/inbox/detail');

  }

  const onCellClick = (params: GridCellParams, event: MouseEvent) => {
    if (params.field===inboxColumnFieldsMappings.renewLease) {
      event.stopPropagation();
      event.preventDefault();
      setMessageId(params.id as string);
      setRenewDialogOpen(true);
      return
    }
    if (params.field===inboxColumnFieldsMappings.delete) {
      event.stopPropagation();
      event.preventDefault();
      setMessageId(params.id as string);
      setDeleteDialogOpen(true);
    }
  }

  const getCellClassName = (params: GridCellParams): string => {
    if (params.field===inboxColumnFieldsMappings.renewLease) {
      return classes.renewLease;
    }
    if (params.field===inboxColumnFieldsMappings.delete) {
      return classes.deleteColumn;
    }
    return ""
  };

  const handleClose = () => {
    setMessageId("");
    setRenewDialogOpen(false);
    setDeleteDialogOpen(false);
  }

  return (
    <LoginRequired>
      <RenewLeaseDialog
        messageId={messageId} type="inbox" handleClose={handleClose} open={renewDialogOpen && !!messageId}
      />
      <DeleteMessageDialog
        messageId={messageId} type="inbox" handleClose={handleClose} open={deleteDialogOpen && !!messageId}
      />
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
          getInboxState===messagesAction.getInboxSuccess.type &&
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
