import React from 'react';
import CommonBar from 'components/CommonBar';
import useStyles from './styles';
import {
  Accordion,
  AccordionDetails,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import {allChains, isChainSupported} from 'chains/common';
import CuriumRequired from 'guards/CuriumRequired';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import CuriumConnectionRequired from 'guards/CuriumConnectionRequired';
import {MAX_DAYS, MAX_HOURS, MAX_MINUTES, MAX_SECONDS, MAX_YEARS} from './interfaces';
import {ethChains} from 'chains';
import {useSelector} from 'react-redux';
import {AppState} from 'store';
import useComposeState from 'pages/Compose/useComposeState';


const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;

  const composeState = useComposeState({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0},
    {chainName: ethChains[0].name, message: '', publicKey: ''}
  );
  const {composeForm, errors, handleChange, leaseForm, clearForm, handleSubmit} = composeState;

  return (
    <CuriumRequired>
      <BluzelleAccountRequired>
        <CuriumConnectionRequired>
          <div className={classes.root}>
            <CommonBar>
              Compose
            </CommonBar>
            <Accordion>
              <CommonAccordionHeader>New Message</CommonAccordionHeader>
              <AccordionDetails className={classes.accordionDetails}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.formControlContainer}>
                    <TextField
                      fullWidth={true}
                      label="Enter Recipient's Public Key"
                      onChange={handleChange('publicKey')}
                      value={composeForm.publicKey}
                      id="publicKey"
                      error={!!errors.publicKeyError}
                    />
                    <FormHelperText error={!!errors.publicKeyError}>
                      {errors.publicKeyError}
                    </FormHelperText>
                  </div>
                  <div className={classes.formControlContainer}>
                    <FormControl fullWidth>
                      <InputLabel id="chainNameLabel">
                        Select Recipient's Chain&nbsp;*
                      </InputLabel>
                      <Select
                        fullWidth={true}
                        value={composeForm.chainName}
                        onChange={handleChange('chainName')}
                        labelId="chainNameLabel"
                      >
                        {
                          allChains.map((chain) => (
                            <MenuItem disabled={!isChainSupported(chain.chain)} value={chain.name} key={chain.name}>
                              {chain.name}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.formControlContainer}>
                    <TextField
                      fullWidth={true}
                      label="My Public Key"
                      disabled
                      multiline={true}
                      value={currentAccount?.publicKey || ""}
                      variant="outlined"
                    />
                  </div>
                  <div className={classes.formControlContainer}>
                    <TextField
                      fullWidth={true}
                      label="My Chain Name"
                      disabled
                      multiline={true}
                      value={currentAccount?.chainName}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <FormLabel className={classes.leaseLabel}>
                      Select Message Lease
                      <FormHelperText className={classes.leaseError} error={!!errors.leaseFormError}>
                        {errors.leaseFormError}
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
                  <div className={classes.formControlContainer}>
                    <TextField
                      multiline
                      fullWidth
                      rows={10}
                      id="message"
                      label="Enter your message"
                      onChange={handleChange("message")}
                      value={composeForm.message}
                      variant="outlined"
                      placeholder="Enter your message here..."
                      error={!!errors.messageError}
                    />
                    <FormHelperText error={!!errors.messageError}>
                      {errors.messageError}
                    </FormHelperText>
                  </div>
                  <div className={classes.footer}>
                    <Button
                      onClick={clearForm}
                      type="reset"
                      variant="contained"
                      color="secondary"
                    >
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      variant="contained"
                      color="inherit"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </AccordionDetails>
            </Accordion>
          </div>
        </CuriumConnectionRequired>
      </BluzelleAccountRequired>
    </CuriumRequired>
  );
}

export default ComposePage;
