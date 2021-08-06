import React, {useEffect} from 'react';
import useStyles from './styles';
import {CommonBar} from 'components';
import {Button, Card, FormLabel, TextField, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {Redirect, useHistory} from 'react-router-dom';
import {OutboxMessage} from 'api';
import {ArrowBack} from '@material-ui/icons';
import {getLeaseString} from 'utils/helpers';


const OutboxMsgDetail: React.FC = () => {
  const classes = useStyles();
  const msgDetail = useSelector((appState: AppState) => appState.messagesState.outboxMsgDetail as OutboxMessage);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(messagesAction.setOutboxMsgDetail({...msgDetail}));
    }, 1000)
    return () => clearInterval(intervalId);
  }, [dispatch, msgDetail]);

  const handleBackClick = () => {
    history.goBack();
  }

  return (
    <>
      {
        msgDetail ?
          <div className={classes.root}>
            <CommonBar>Outbox Detail</CommonBar>
            <Card className={classes.card}>
              <div className={classes.header}>
                <Button onClick={handleBackClick} className={classes.buttonBack}>
                  <ArrowBack/>
                  <Typography className={classes.back}>Back</Typography>
                </Button>
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Recipient Chain Name</FormLabel>
                <TextField
                  className={classes.textField} variant="outlined" fullWidth value={msgDetail.recipientChainName}
                  disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Recipient Public Key</FormLabel>
                <TextField
                  className={classes.textField} variant="outlined" fullWidth value={msgDetail.recipientPublicKey}
                  disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Date Created</FormLabel>
                <TextField
                  className={classes.textField}
                  variant="outlined" fullWidth value={`${new Date(msgDetail.timestamp || 0).toDateString()}`} disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Lease Period</FormLabel>
                <TextField
                  className={classes.textField}
                  variant="outlined" fullWidth
                  value={`${getLeaseString(msgDetail.lease)}`} disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Message</FormLabel>
                <TextField
                  className={classes.textField}
                  multiline
                  minRows={5}
                  variant="outlined" fullWidth
                  value={msgDetail.message} disabled
                />
              </div>
            </Card>
          </div>:
          <Redirect to="/inbox"/>
      }
    </>
  )
}

export default OutboxMsgDetail;
