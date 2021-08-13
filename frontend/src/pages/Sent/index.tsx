import React, {MouseEvent, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {messagesAction} from 'store';
import {useDispatch} from 'react-redux';
import {CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {DataGrid, GridCellParams, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from 'react-router-dom';
import useSentPageState from 'pages/Sent/useSentPageState';
import RenewLeaseDialog from 'dialogs/RenewLease';
import {sentColumnFieldsMappings} from 'pages/Sent/columns';
import DeleteMessageDialog from 'dialogs/DeleteMessage';
import {SentMessage} from 'api/interfaces';


const SentPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getSentState, sentDecrypted, warningMsg] = useSentPageState();
  const [renewDialogOpen, setRenewDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();


  const onRowClickHandler = (param: GridRowParams, _event: MouseEvent) => {
    const sentDetail = param.row as SentMessage;
    dispatch(messagesAction.setSentMsgDetail(sentDetail));
    history.push('/sent/detail');
  }

  const onCellClick = (params: GridCellParams, event: MouseEvent) => {
    if (params.field===sentColumnFieldsMappings.renewLease) {
      event.stopPropagation();
      event.preventDefault();
      setMessageId(params.id as string);
      setRenewDialogOpen(true);
      return
    }
    if (params.field===sentColumnFieldsMappings.delete) {
      event.stopPropagation();
      event.preventDefault();
      setMessageId(params.id as string);
      setDeleteDialogOpen(true);
    }
  }

  const getCellClassName = (params: GridCellParams): string => {
    if (params.field===sentColumnFieldsMappings.renewLease) {
      return classes.renewLease;
    }
    if (params.field===sentColumnFieldsMappings.delete) {
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
    <CuriumRequired>
      <BluzelleAccountRequired>
        <RenewLeaseDialog
          messageId={messageId} type="sent" handleClose={handleClose} open={renewDialogOpen && !!messageId}
        />
        <DeleteMessageDialog
          messageId={messageId} type="sent" handleClose={handleClose} open={deleteDialogOpen && !!messageId}
        />
        <div className={classes.root}>
          <CommonBar>Sent</CommonBar>
          {
            getSentState===messagesAction.getSentPending.type &&
            <div className={classes.loader}>
              <CircularProgress/>
            </div>
          }
          {
            (getSentState!==messagesAction.getSentPending.type || !sentDecrypted) &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }

          {
            getSentState===messagesAction.getSentSuccess.type &&
            sentDecrypted &&
            sentDecrypted.length!==0 &&
            <DataGrid
              className={classes.dataGrid}
              rows={sentDecrypted}
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
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default SentPage;
