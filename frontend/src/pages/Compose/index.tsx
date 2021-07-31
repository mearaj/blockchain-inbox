import React, {useCallback, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import {
  allChains,
  AllowedChainEnum,
  getChainByName,
  getEncryptedMessageFromPublicKey,
  isChainSupported,
  isPublicKeyFormatValid
} from 'chains/common';
import CuriumRequired from 'guards/CuriumRequired';
import BluzelleAccountRequired from 'guards/BluzelleAccountRequired';
import {ethChains} from 'chains';
import {HELPER_MSG_ETH_PUBLIC_KEY} from 'chains/eth/helper';
import {HELPER_MSG_BLUZELLE_PUBLIC_KEY} from 'chains/bluzelle/helper';
import {messagesAction} from 'store/Messages';
import CuriumConnectionRequired from 'guards/CuriumConnectionRequired';
import {BLUZELLE_BACKEND_PUBLIC_ADDRESS, BLUZELLE_CHAIN_ID} from 'config';
import {AminoSignResponse, MsgSend} from '@cosmjs/launchpad';
import {coin} from '@cosmjs/proto-signing';
import {Key} from '@keplr-wallet/types';
import {KeyValues, MAX_DAYS, MAX_HOURS, MAX_MINUTES, MAX_SECONDS, MAX_YEARS, MessageLeaseForm} from './interfaces';
import {loaderActions} from 'store/Loader';
import {useHistory} from 'react-router-dom';


const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;

  const [recipientChainName, setRecipientChainName] = useState<string>(ethChains[0].name);
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>("");
  const [recipientPublicKeyHelperMsg, setRecipientPublicKeyHelperMsg] = useState<string>("");
  const [lease, setLease] = useState<MessageLeaseForm>({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0});
  const [leaseErr, setLeaseErr] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState<string>("");
  const curiumPaymentState = useSelector((state: AppState) => state.messagesState.curiumPaymentState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (ID: KeyValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let numericValue: number;
    if (recipientPublicKeyHelperMsg) {
      setRecipientPublicKeyHelperMsg("");
    }
    if (messageErr) {
      setMessageErr("");
    }
    if (leaseErr) {
      setLeaseErr("");
    }
    switch (ID) {
      case KeyValues.ID_RECIPIENT_PUBLIC_KEY:
        setRecipientPublicKey(value);
        break;
      case KeyValues.ID_MESSAGE:
        setMessage(value);
        break;
      case KeyValues.ID_RECIPIENT_CHAIN_NAME:
        setRecipientChainName(value);
        break;
      case KeyValues.ID_LEASE_SECONDS:
        numericValue = parseInt(value);
        if (value.trim().replace(" ", "")==="") {
          setLease({...lease, seconds: ''});
        } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_SECONDS) {
          setLease({...lease, seconds: numericValue});
        }
        break;
      case KeyValues.ID_LEASE_MINUTES:
        numericValue = parseInt(value);

        if (value.trim().replace(" ", "")==="") {
          setLease({...lease, minutes: ''});
        } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_MINUTES) {
          setLease({...lease, minutes: numericValue});
        }
        break;
      case KeyValues.ID_LEASE_HOURS:
        numericValue = parseInt(value);
        if (value.trim().replace(" ", "")==="") {
          setLease({...lease, hours: ''});
        } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_HOURS) {
          setLease({...lease, hours: numericValue});
        }
        break;
      case KeyValues.ID_LEASE_DAYS:
        numericValue = parseInt(value);
        if (value.trim().replace(" ", "")==="") {
          setLease({...lease, days: ''});
        } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_DAYS) {
          setLease({...lease, days: numericValue});
        }
        break;
      case KeyValues.ID_LEASE_YEARS:
        numericValue = parseInt(value);
        if (value.trim().replace(" ", "")==="") {
          setLease({...lease, years: ''});
        } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_YEARS) {
          setLease({...lease, years: numericValue});
        }
        break;
    }
  }

  const handleCuriumPaymentApproval = useCallback(async () => {
    await window.keplr?.enable(BLUZELLE_CHAIN_ID);
    const curiumAccount: Key | undefined = await window.keplr?.getKey(BLUZELLE_CHAIN_ID);
    const offlineSigner = await window.keplr?.getOfflineSigner(BLUZELLE_CHAIN_ID);
    const msg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: Buffer.from(curiumAccount!.bech32Address).toString('utf8'),
        to_address: BLUZELLE_BACKEND_PUBLIC_ADDRESS,
        amount: [coin(1000, "ubnt")],
      }
    };

    try {
      const response: AminoSignResponse = await offlineSigner!.signAmino(Buffer.from(curiumAccount!.bech32Address).toString('utf8'), {
        account_number: currentAccount?.publicKey || "",
        chain_id: BLUZELLE_CHAIN_ID,
        fee: {
          amount: [coin(1000, "ubnt")], gas: '1'
        },
        memo: 'This is for result 1',
        msgs: [msg],
        sequence: ''
      });
      if (response) {
        dispatch(messagesAction.curiumPaymentSuccess(response));
      } else {
        dispatch(messagesAction.curiumPaymentFailure());
      }
    } catch (e) {
      dispatch(messagesAction.curiumPaymentFailure());
    }
  }, [currentAccount?.publicKey, dispatch]);

  const clearForm = () => {
    setRecipientPublicKey("");
    setLease({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0});
    setMessage('');
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {isValid} = isPublicKeyFormatValid(recipientChainName, recipientPublicKey);
    if (!isValid) {
      const chainInfo = getChainByName(recipientChainName);
      switch (chainInfo?.chain) {
        case AllowedChainEnum.ETH:
          setRecipientPublicKeyHelperMsg(HELPER_MSG_ETH_PUBLIC_KEY);
          break;
        case AllowedChainEnum.Bluzelle:
          setRecipientPublicKeyHelperMsg(HELPER_MSG_BLUZELLE_PUBLIC_KEY);
          break;
      }
      return;
    }
    if (message.trim().replace(" ", "")==="") {
      setMessageErr("A message cannot be empty!");
      return;
    }
    if (!lease.seconds && !lease.minutes && !lease.hours && !lease.days && !lease.years) {
      setLeaseErr("Lease Cannot Be Zero Or Empty!");
      return;
    }

    const creatorValidator = await getEncryptedMessageFromPublicKey(
      currentAccount?.publicKey || "",
      currentAccount!.chainName,
      message);
    const recipientValidator = await getEncryptedMessageFromPublicKey(
      recipientPublicKey,
      recipientChainName,
      message
    );
    if (creatorValidator.isValid && recipientValidator.isValid) {
      const creatorEncryptedMessage = creatorValidator.encryptedMessage;
      const recipientEncryptedMessage = recipientValidator.encryptedMessage;
      dispatch(messagesAction.sendMessage({
          creatorChainName: currentAccount!.chainName,
          creatorPublicKey: currentAccount?.publicKey || "",
          lease: {
            seconds: lease.seconds==="" ? 0:lease.seconds,
            minutes: lease.minutes==="" ? 0:lease.minutes,
            hours: lease.hours==="" ? 0:lease.hours,
            days: lease.days==="" ? 0:lease.days,
            years: lease.years==="" ? 0:lease.years,
          },
          creatorEncryptedMessage,
          recipientEncryptedMessage,
          recipientChainName,
          recipientPublicKey,
          timestamp: Date.now().valueOf(),
        })
      );
    }
  };

  useEffect(() => {
    const timerId = setTimeout(async () => {
      switch (curiumPaymentState) {
        case messagesAction.curiumPaymentPending.type:
          dispatch(loaderActions.showLoader());
          await handleCuriumPaymentApproval();
          break;
        case messagesAction.curiumPaymentFailure.type:
          clearForm();
          dispatch(loaderActions.hideLoader());
          dispatch(messagesAction.clearCuriumPaymentState());
          break;
        case messagesAction.curiumPaymentSuccess.type:
          clearForm();
          dispatch(loaderActions.hideLoader());
          dispatch(messagesAction.clearCuriumPaymentState());
          history.push('/sent');
      }
    })
    return () => clearTimeout(timerId);
  }, [curiumPaymentState, dispatch, handleCuriumPaymentApproval, history]);


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
                      onChange={handleChange(KeyValues.ID_RECIPIENT_PUBLIC_KEY)}
                      value={recipientPublicKey}
                      id={KeyValues.ID_RECIPIENT_PUBLIC_KEY}
                      error={!!recipientPublicKeyHelperMsg}
                    />
                    <FormHelperText error={!!recipientPublicKeyHelperMsg}>
                      {recipientPublicKeyHelperMsg}
                    </FormHelperText>
                  </div>
                  <div className={classes.formControlContainer}>
                    <FormControl fullWidth>
                      <InputLabel id="chainNameLabel">
                        Select Recipient's Chain&nbsp;*
                      </InputLabel>
                      <Select
                        fullWidth={true}
                        value={recipientChainName}
                        onChange={handleChange(KeyValues.ID_RECIPIENT_CHAIN_NAME)}
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
                      <FormHelperText className={classes.leaseError} error={!!leaseErr}>{leaseErr}</FormHelperText>
                    </FormLabel>
                    <div className={classes.leaseFormGroup}>
                      <TextField
                        style={{minWidth: 0}}
                        label="Seconds"
                        id={KeyValues.ID_LEASE_SECONDS}
                        value={lease.seconds}
                        type="number"
                        inputProps={{min: 0, max: MAX_SECONDS}}
                        onChange={handleChange(KeyValues.ID_LEASE_SECONDS)}
                      />
                      <TextField
                        label="Minutes"
                        id={KeyValues.ID_LEASE_MINUTES}
                        value={lease.minutes}
                        type="number"
                        inputProps={{min: 0, max: MAX_MINUTES}}
                        onChange={handleChange(KeyValues.ID_LEASE_MINUTES)}
                      />
                      <TextField
                        label="Hours"
                        id={KeyValues.ID_LEASE_HOURS}
                        value={lease.hours}
                        type="number"
                        inputProps={{min: 0, max: MAX_HOURS}}
                        onChange={handleChange(KeyValues.ID_LEASE_HOURS)}
                      />
                      <TextField
                        label="Days"
                        id={KeyValues.ID_LEASE_DAYS}
                        value={lease.days}
                        type="number"
                        inputProps={{min: 0, max: MAX_DAYS}}
                        onChange={handleChange(KeyValues.ID_LEASE_DAYS)}
                      />
                      <TextField
                        label="Years"
                        id={KeyValues.ID_LEASE_YEARS}
                        value={lease.years}
                        type="number"
                        inputProps={{min: 0, max: MAX_YEARS}}
                        onChange={handleChange(KeyValues.ID_LEASE_YEARS)}
                      />
                    </div>
                  </div>
                  <div className={classes.formControlContainer}>
                    <TextField
                      multiline
                      fullWidth
                      rows={10}
                      id={KeyValues.ID_MESSAGE}
                      label="Enter your message"
                      onChange={handleChange(KeyValues.ID_MESSAGE)}
                      value={message}
                      variant="outlined"
                      placeholder="Enter your message here..."
                      error={!!messageErr}
                    />
                    <FormHelperText error={!!messageErr}>
                      {messageErr}
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
