import React, {useCallback} from 'react';

import useStyles from './styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import LeaseForm from 'components/LeaseForm';
import {useLeaseForm} from 'hooks/useLeaseForm';
import {useCuriumPayment} from 'hooks/useCuriumPayment';


export interface RenewLeaseDialogProps {
  open: boolean;
  handleClose: () => void;
  type: 'inbox' | 'sent' | 'outbox'
}

const RenewLeaseDialog: React.FC<RenewLeaseDialogProps> = (props) => {
  const classes = useStyles();
  const lease = useLeaseForm({days: 0, years: 0, minutes: 0, hours: 0, seconds: 0})
  const [paymentHandler] = useCuriumPayment();


  const handleClose = () => {
    lease.clearError();
    lease.clearForm();
    props.handleClose();
  };

  const handleCuriumPaymentApproval = useCallback(async () => {
    const response = await paymentHandler();
    console.log(response);
  }, [paymentHandler]);

  const handleSubmit = async () => {
    lease.validate();
    if (!lease.leaseFormError) {
      await handleCuriumPaymentApproval();
    }
    handleClose();
  }

  return (
    <Dialog className={classes.root} open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Renew Lease</DialogTitle>
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
