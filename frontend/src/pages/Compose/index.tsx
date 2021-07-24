import React, {useEffect, useState} from 'react';
import CommonBar from 'components/CommonBar';
import {useHistory} from 'react-router-dom';
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
import {loaderActions} from 'store/Loader';

enum KeyValues {
  ID_RECIPIENT_CHAIN_NAME = "ID_RECIPIENT_CHAIN_NAME",
  ID_RECIPIENT_PUBLIC_KEY = "ID_RECIPIENT_PUBLIC_KEY",
  ID_MESSAGE = "ID_MESSAGE",
  ID_LEASE_SECONDS = "ID_LEASE_SECONDS",
  ID_LEASE_MINUTES = "ID_LEASE_MINUTES",
  ID_LEASE_HOURS = "ID_LEASE_HOURS",
  ID_LEASE_DAYS = "ID_LEASE_DAYS",
  ID_LEASE_YEARS = "ID_LEASE_YEARS",
}

export interface MessageLeaseForm {
  seconds: number | '';
  minutes: number | '';
  hours: number | '';
  days: number | '';
  years: number | '';
}


const MAX_SECONDS = 59;
const MAX_MINUTES = 59;
const MAX_HOURS = 23;
const MAX_DAYS = 365;
const MAX_YEARS = 9;


const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;

  const [recipientChainName, setRecipientChainName] = useState<string>(ethChains[0].name);
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>("");
  const [recipientPublicKeyHelperMsg, setRecipientPublicKeyHelperMsg] = useState<string>("");
  const [lease, setLease] = useState<MessageLeaseForm>({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0});
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState<string>("");
  const sendMessageState = useSelector((state: AppState) => state.messagesState.sendMessageState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (ID: KeyValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let numericValue: number;
    if (recipientPublicKeyHelperMsg) {
      setRecipientPublicKeyHelperMsg("");
    }
    if (messageErr) {
      setMessageErr("");
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


    const creatorValidator = await getEncryptedMessageFromPublicKey(
      currentAccount!.publicKey,
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
          creatorPublicKey: currentAccount!.publicKey,
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
        })
      );
    }
    console.log(currentAccount!.chainName,creatorValidator);
    console.log(recipientChainName,recipientValidator);
    // dispatch(loaderActions.showLoader());
    // setTimeout(async () => {
    //   await dispatch(sendMessage(message));
    //   await dispatch(loaderActions.hideLoader());
    //   const msg: MsgSend = {
    //     type: "cosmos-sdk/MsgSend",
    //     value: {
    //       from_address: currentAccount?.publicKey || "",
    //       to_address: "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah",
    //       amount: [coin(1000000, "BLZ")],
    //     }
    //   };
    //   const result = await window.keplr!.signAmino(CHAIN_ID, currentAccount?.publicKey || "", {
    //     account_number: currentAccount?.publicKey || "",
    //     chain_id: CHAIN_ID,
    //     fee: {
    //       amount: [coin(1000000, "BLZ")], gas: '1'
    //     },
    //     memo: 'This is for result 1',
    //     msgs: [msg],
    //     sequence: ''
    //   });
    //   console.log(result)


    // let result2;
    // const signedTx = makeStdTx(result.signed, result.signature);
    // try {
    //  result2 = await window.keplr!.sendTx(CHAIN_ID, signedTx, BroadcastMode.Sync);
    // } catch (e) {
    //   console.dir(e);
    // }
    // console.log(result2);

    // let result3;
    // const std:StdTx = {
    //   fee: {
    //     amount: [coin(1000000, "BLZ")], gas: '1'
    //   },
    //   memo: 'This is for result 1',
    //   msg: [msg],
    //   signatures: [result.signature]
    // };
    // try {
    //   result3 = await window.keplr!.sendTx(CHAIN_ID, std, BroadcastMode.Async);
    // } catch (e) {
    //   console.dir(e);
    // }
    // console.log(result3);


    // const result4 = await window.keplr!.suggestToken(CHAIN_ID, currentAccount);
    // console.log(result4);

    // }, 500);
  };

  useEffect(() => {
    switch (sendMessageState) {
      case messagesAction.sendMessagePending.type:
        dispatch(loaderActions.showLoader());
        break;
      case messagesAction.sendMessageFailure.type:
        dispatch(loaderActions.hideLoader());
        break;
      case messagesAction.sendMessageSuccess.type:
        dispatch(loaderActions.hideLoader());
        dispatch(messagesAction.sendMessageCompleted());
        history.push('/outbox');
    }


  }, [sendMessageState]);

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
                      value={currentAccount?.publicKey}
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
                    <Button type="reset" variant="contained" color={'primary'}>Clear</Button>
                    <Button type="submit" style={{marginLeft: 24}} variant="contained" color={'primary'}>Send</Button>
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
