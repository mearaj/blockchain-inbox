import React, {useState} from 'react';
import CommonBar from 'components/CommonBar';
import {Prompt} from 'react-router-dom';
import useStyles from './styles';
import {
  Accordion,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import {allChains, isChainSupported} from 'chains/common';

const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const {currentAccount} = accountsState;

  const DEFAULT_SELECT_CHAIN_VALUE = "Select";
  const ID_RECIPIENT_PUBLIC_KEY = "ID_RECIPIENT_PUBLIC_KEY";
  const ID_MESSAGE = "ID_MESSAGE"
  const [recipientChainName, setRecipientChainName] = useState<string>(DEFAULT_SELECT_CHAIN_VALUE);
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>("");
  const [message, setMessage] = useState<string>("");


  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ID = event.target.id;
    const value = event.target.value;
    switch (ID) {
      case ID_RECIPIENT_PUBLIC_KEY:
        setRecipientPublicKey(value);
        break;
      case ID_MESSAGE:
        setMessage(message);
        break;
    }
  }
  const handleChainNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRecipientChainName(value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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

  return (
    <div className={classes.root}>
      <Prompt
        when={
          !!message.replace(" ", "") ||
          !!recipientPublicKey.replace(" ", "")
        }
        message={(location) => "Are you sure you want to exit? Any changes will be lost!"}
      />
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
                onChange={handleChange}
                value={recipientPublicKey}
                id={ID_RECIPIENT_PUBLIC_KEY}
                placeholder="Example 0x3d932...."
              />
            </div>
            <div className={classes.formControlContainer}>

              <FormControl fullWidth>
                <InputLabel id="chainNameLabel">
                  Select Recipient's Chain&nbsp;*
                </InputLabel>
                <Select
                  fullWidth={true}
                  value={recipientChainName}
                  onChange={handleChainNameChange}
                  labelId="chainNameLabel"
                  defaultValue={DEFAULT_SELECT_CHAIN_VALUE}
                >
                  {
                    recipientChainName===DEFAULT_SELECT_CHAIN_VALUE &&
                    <MenuItem value={DEFAULT_SELECT_CHAIN_VALUE} key={DEFAULT_SELECT_CHAIN_VALUE}>
                      {DEFAULT_SELECT_CHAIN_VALUE}
                    </MenuItem>
                  }
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
                multiline
                fullWidth
                rows={10}
                id={ID_MESSAGE}
                label="Enter your message"
                onChange={handleChange}
                value={message}
                variant="outlined"
                placeholder="Enter your message here..."
              />
            </div>
            <div className={classes.footer}>
              <Button type="reset" variant="contained" color={'primary'}>Clear</Button>
              <Button type="submit" style={{marginLeft: 24}} variant="contained" color={'primary'}>Send</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ComposePage;
