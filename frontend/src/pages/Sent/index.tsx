import React, {MouseEvent, useState} from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CuriumRequired from 'guards/CuriumRequired';
import {messagesAction} from 'store';
import {useDispatch} from 'react-redux';
import {SentMessage} from 'api';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {DataGrid, GridCellParams, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from 'react-router-dom';
import {Schedule} from '@material-ui/icons';
import useSentState from 'pages/Sent/useSentState';
import RenewLeaseDialog from 'dialogs/RenewLease';

const getRenewColumnComponent = (_params: GridCellParams) => {
  return <Button color="secondary" variant="contained">
    <Schedule/>
    <Typography style={{marginLeft: 6}}>Renew</Typography>
  </Button>
};

const SentPage: React.FC = () => {
  const classes = useStyles();
  const [columns, getSentState, sentDecrypted, warningMsg] = useSentState(getRenewColumnComponent);
  const [open, setOpen] = React.useState(false);
  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();


  const onRowClickHandler = (param: GridRowParams, event: MouseEvent) => {
    const sentDetail = param.row as SentMessage;
    dispatch(messagesAction.setSentMsgDetail(sentDetail));
    history.push('/sent/detail');
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
    <CuriumRequired>
      <BluzelleAccountRequired>
        <RenewLeaseDialog messageId={messageId} type="sent" handleClose={handleClose} open={open && !!messageId}/>
        <div className={classes.root}>
          <CommonBar>Sent</CommonBar>
          {
            getSentState===messagesAction.getSentPending.type &&
            <div className={classes.loader}>
              <CircularProgress/>
            </div>
          },
          {
            (getSentState!==messagesAction.getSentPending.type || !sentDecrypted) &&
            <div className={classes.emptyContainer}>
              <div className={classes.emptyTitle}>
                <Typography variant="h6">{warningMsg}</Typography>
              </div>
            </div>
          }

          {
            getSentState!==messagesAction.getSentPending.type &&
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
