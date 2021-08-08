import React, {useCallback} from 'react';

import useStyles from './styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import LeaseForm from 'components/LeaseForm';
import {useLeaseFormState} from 'hooks/useLeaseFormState';
import {useCuriumPayment} from 'hooks/useCuriumPayment';
import {isLeaseFormValid} from 'utils/helpers';
import {useDispatch} from 'react-redux';
import {messagesAction} from 'store';
import {getLeaseFromLeaseForm} from 'utils/helpers/getLeaseFromLeaseForm';


export interface RenewLeaseDialogProps {
  open: boolean;
  handleClose: () => void;
  type: 'inbox' | 'sent' | 'outbox',
  messageId: string;
}

const RenewLeaseDialog: React.FC<RenewLeaseDialogProps> = (props) => {
  const classes = useStyles();
  const lease = useLeaseFormState({days: 0, years: 0, minutes: 0, hours: 0, seconds: 0})
  const [paymentHandler] = useCuriumPayment();
  const dispatch = useDispatch();


  const handleClose = () => {
    lease.clearError();
    lease.clearForm();
    props.handleClose();
  };

  const handleCuriumPaymentApproval = useCallback(async () => {
    const response = await paymentHandler();
    if (response) {
      switch (props.type) {
        case 'sent':
          dispatch(messagesAction.renewSentMsgLease(
            {id: props.messageId, lease: getLeaseFromLeaseForm(lease.leaseForm), ...response}));
          break;
        case 'inbox':
          dispatch(messagesAction.renewInboxMsgLease(
            {id: props.messageId, lease: getLeaseFromLeaseForm(lease.leaseForm), ...response}));
          break;
      }
    }
  }, [dispatch, lease.leaseForm, paymentHandler, props.messageId, props.type]);


  const handleSubmit = async () => {
    lease.validate();
    const isLeaseValid = isLeaseFormValid(lease.leaseForm);
    if (isLeaseValid.isValid && !lease.leaseFormError) {
      handleClose();
      await handleCuriumPaymentApproval();
    }
  }

  return (
    <Dialog className={classes.root} open={props.open} onClose={handleClose} aria-labelledby="renew-lease-dialog">
      <DialogTitle id="renew-lease-dialog">Renew Lease</DialogTitle>
      <DialogContent>
        <LeaseForm {...lease}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RenewLeaseDialog;
