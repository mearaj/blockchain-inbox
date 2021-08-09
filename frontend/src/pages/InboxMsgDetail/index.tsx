import React, {useEffect} from 'react';
import useStyles from './styles';
import {CommonBar} from 'components';
import {Button, Card, FormLabel, TextField, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, messagesAction} from 'store';
import {Redirect, useHistory} from 'react-router-dom';
import {getExpiryFromLease} from 'utils/helpers/getExpiryFromLease';
import {ArrowBack} from '@material-ui/icons';
import {InboxMessage} from 'api/inbox';


const InboxMsgDetail: React.FC = () => {
  const classes = useStyles();
  const msgDetail = useSelector((appState: AppState) => appState.messagesState.inboxMsgDetail as InboxMessage);
  const inboxLastFetched = useSelector((appState: AppState) => appState.messagesState.inboxLastFetched);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(messagesAction.setInboxMsgDetail({...msgDetail}));
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
            <CommonBar>Inbox Detail</CommonBar>
            <Card className={classes.card}>
              <div className={classes.header}>
                <Button onClick={handleBackClick} className={classes.buttonBack}>
                  <ArrowBack/>
                  <Typography className={classes.back}>Back</Typography>
                </Button>
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>From Chain Name</FormLabel>
                <TextField
                  className={classes.textField} variant="outlined" fullWidth value={msgDetail.creatorChainName} disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>From Public Key</FormLabel>
                <TextField
                  className={classes.textField} variant="outlined" fullWidth value={msgDetail.creatorPublicKey} disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Date Created</FormLabel>
                <TextField
                  className={classes.textField}
                  variant="outlined" fullWidth value={`${new Date(msgDetail.timestamp).toDateString()}`} disabled
                />
              </div>
              <div className={classes.formControl}>
                <FormLabel className={classes.label}>Expires After</FormLabel>
                <TextField
                  className={classes.textField}
                  variant="outlined" fullWidth
                  value={`${getExpiryFromLease(msgDetail.lease, inboxLastFetched)}`} disabled
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

export default InboxMsgDetail;
