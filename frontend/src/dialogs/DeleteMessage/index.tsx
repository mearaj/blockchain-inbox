import React, {useCallback} from 'react';

import useStyles from './styles';
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import {useCuriumPayment} from 'hooks/useCuriumPayment';
import {useDispatch} from 'react-redux';
import {messagesAction} from 'store';


export interface DeleteMessageDialogProps {
  open: boolean;
  handleClose: () => void;
  type: 'inbox' | 'sent' | 'outbox',
  messageId: string;
}

const DeleteMessageDialog: React.FC<DeleteMessageDialogProps> = (props) => {
  const classes = useStyles();
  const [paymentHandler] = useCuriumPayment();
  const dispatch = useDispatch();


  const handleClose = () => {
    props.handleClose();
  };

  const handleCuriumPaymentApproval = useCallback(async () => {
    const response = await paymentHandler();
    if (response) {
      switch (props.type) {
        case 'sent':
          dispatch(messagesAction.deleteSentMessage(
            {id: props.messageId, ...response}));
          break;
        case 'inbox':
          dispatch(messagesAction.deleteInboxMessage(
            {id: props.messageId, ...response}));
          break;
      }
    }
  }, [dispatch, paymentHandler, props.messageId, props.type]);


  const handleSubmit = async () => {
    handleClose();
    await handleCuriumPaymentApproval();
  }

  return (
    <Dialog className={classes.root} open={props.open} onClose={handleClose} aria-labelledby="delete-message-dialog">
      <DialogTitle id="delete-message-dialog">Are you sure you want to delete this message?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMessageDialog;
