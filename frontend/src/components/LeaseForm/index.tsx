import React from 'react';
import useStyles from './styles';
import {FormHelperText, FormLabel, TextField} from '@material-ui/core';
import {MAX_DAYS, MAX_HOURS, MAX_MINUTES, MAX_SECONDS, MAX_YEARS} from 'pages/Compose/interfaces';
import {LeaseFormState} from 'hooks/useLeaseForm';

export const LeaseForm: React.FC<LeaseFormState> = (props) => {
  const classes = useStyles();
  const {leaseForm, leaseFormError, handleChange} = props;

  return (
    <div>
      <FormLabel className={classes.leaseLabel}>
        Select Message Lease
        <FormHelperText className={classes.leaseError} error={!!leaseFormError}>
          {leaseFormError}
        </FormHelperText>
      </FormLabel>
      <div className={classes.leaseFormGroup}>
        <TextField
          style={{minWidth: 0}}
          label="Seconds"
          id="seconds"
          value={leaseForm.seconds}
          type="number"
          inputProps={{min: 0, max: MAX_SECONDS}}
          onChange={handleChange('seconds')}
        />
        <TextField
          label="Minutes"
          id="minutes"
          value={leaseForm.minutes}
          type="number"
          inputProps={{min: 0, max: MAX_MINUTES}}
          onChange={handleChange('minutes')}
        />
        <TextField
          label="Hours"
          id="hours"
          value={leaseForm.hours}
          type="number"
          inputProps={{min: 0, max: MAX_HOURS}}
          onChange={handleChange('hours')}
        />
        <TextField
          label="Days"
          id="days"
          value={leaseForm.days}
          type="number"
          inputProps={{min: 0, max: MAX_DAYS}}
          onChange={handleChange('days')}
        />
        <TextField
          label="Years"
          id="years"
          value={leaseForm.years}
          type="number"
          inputProps={{min: 0, max: MAX_YEARS}}
          onChange={handleChange('years')}
        />
      </div>
    </div>
  )
}


export default LeaseForm;
