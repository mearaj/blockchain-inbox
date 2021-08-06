import React, {useEffect, useState} from 'react';

import useStyles from './styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import LeaseForm from 'components/LeaseForm';
import {useLeaseForm} from 'hooks/useLeaseForm';


export interface RenewLeaseDialogProps {
  open: boolean;
  handleClose: (event:object, reason?:string)=>void
}

const RenewLeaseDialog: React.FC<RenewLeaseDialogProps> = (props) => {
  const classes = useStyles();
  const lease = useLeaseForm({days: 0, years: 0, minutes: 0, hours: 0, seconds: 0})

  const handleClose = (event:object, reason?:string) => {
    lease.clearError();
    props.handleClose(event,reason);
  };

  const handleSubmit = ()=> {
    lease.validate();
  }

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
