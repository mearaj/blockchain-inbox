import React from 'react';
import CommonBar from 'components/CommonBar';
import useStyles from './styles';
import {Accordion, AccordionDetails, Button, FormHelperText, TextField} from '@material-ui/core';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import CuriumRequired from 'guards/CuriumRequired';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import CuriumConnectionRequired from 'guards/CuriumConnectionRequired';
import {ethChains} from 'chains';
import useComposeState from 'pages/Compose/useComposeState';
import LeaseForm from 'components/LeaseForm';
import ComposeSliceForm from 'components/ComposeSliceForm';


const ComposePage: React.FC = () => {
  const classes = useStyles();
  const composeState = useComposeState({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0},
    {chainName: ethChains[0].name, message: '', publicKey: ''}
  );
  const {
    leaseFormState,
    composeSliceFormState,
    clearForm,
    handleSubmit
  } = composeState;

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
                  <ComposeSliceForm {...composeSliceFormState}/>
                  <LeaseForm {...leaseFormState}/>
                  <div className={classes.formControlContainer}>
                    <TextField
                      multiline
                      fullWidth
                      rows={10}
                      id="message"
                      label="Enter your message"
                      onChange={composeSliceFormState.handleChange("message")}
                      value={composeSliceFormState.composeSliceForm.message}
                      variant="outlined"
                      placeholder="Enter your message here..."
                      error={!!composeSliceFormState.messageError}
                    />
                    <FormHelperText error={!!composeSliceFormState.messageError}>
                      {composeSliceFormState.messageError}
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
