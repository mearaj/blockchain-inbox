import React from 'react';
import CommonBar from 'components/CommonBar';
import useStyles from './styles';
import {Button, Card, CardContent, FormControl, FormLabel, MenuItem, Select, TextField} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonAccordionHeader from 'components/CommonAccordionHeader';
import {composeActions} from 'store/Compose';
import {Message} from 'api';
import {sendMessage} from 'store/Message/thunk';
import {loaderActions} from 'store/Loader';
import {CHAIN_ID} from 'config';
import {coin} from '@cosmjs/proto-signing';
import {MsgSend} from '@cosmjs/launchpad';
import {allChains} from 'chains';

const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const composeState = useSelector((state: AppState) => state.composeState);
  const {recipientPublicKey, message, recipientChainName} = composeState;
  const {currentAccount} = accountsState;
  const dispatch = useDispatch()
  const ID_RECIPIENT_PUBLIC_KEY = "ID_RECIPIENT_PUBLIC_KEY";
  const ID_SENDER_PUBLIC_KEY = "ID_SENDER_PUBLIC_KEY";
  const ID_MESSAGE = "ID_MESSAGE"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ID = event.target.id;
    const value = event.target.value;
    switch (ID) {
      case ID_RECIPIENT_PUBLIC_KEY:
        dispatch(composeActions.setTo(value));
        break;
      case ID_MESSAGE:
        dispatch(composeActions.setMessage(value));
    }
  }

  const handleRecipientChainNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(composeActions.setRecipientChainName(event.target.value as string));
  };


  // useEffect(() => {
  //   dispatch(composeActions.setTo(to));
  //   dispatch(composeActions.setFrom(from));
  // },[dispatch, from, to])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let message: Message =
      {
        message: composeState.message,
        from: composeState.senderPublicKey,
        to: composeState.recipientPublicKey
      }
    dispatch(loaderActions.showLoader());
    setTimeout(async () => {
      await dispatch(sendMessage(message));
      await dispatch(loaderActions.hideLoader());
      const msg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: currentAccount?.publicKey || "",
          to_address: "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah",
          amount: [coin(1000000, "BLZ")],
        }
      };
      const result = await window.keplr!.signAmino(CHAIN_ID, currentAccount?.publicKey || "", {
        account_number: currentAccount?.publicKey || "",
        chain_id: CHAIN_ID,
        fee: {
          amount: [coin(1000000, "BLZ")], gas: '1'
        },
        memo: 'This is for result 1',
        msgs: [msg],
        sequence: ''
      });
      console.log(result)


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

    }, 500);
  };

  return (
    <div className={classes.root}>
      <CommonBar>
        Compose
      </CommonBar>
      <Card>
        <CommonAccordionHeader/>
        <CardContent>
          <form onSubmit={handleSubmit}>

            <div>
              <FormLabel htmlFor={ID_RECIPIENT_PUBLIC_KEY}>Enter Recipient's Public Key</FormLabel>
              <TextField
                fullWidth={true}
                onChange={handleChange}
                value={recipientPublicKey}
                id={ID_RECIPIENT_PUBLIC_KEY}
                placeholder="Example 0x3d932...."
                variant="outlined"
              />
            </div>
            <FormControl fullWidth>
              <FormLabel id="chainNameLabel">Select Recipient Chain</FormLabel>
              <Select
                fullWidth={true}
                variant="outlined"
                value={recipientChainName}
                onChange={handleRecipientChainNameChange}
                id="chainName"
                //style={{width: '100%'}}
                labelId="chainNameLabel"
              >
                {
                  allChains.map((chain) => (
                    <MenuItem value={chain.name} key={chain.name}>
                      {chain.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div>
              <FormLabel htmlFor={ID_SENDER_PUBLIC_KEY}>My Public Key</FormLabel>
              <TextField
                fullWidth={true}
                id={ID_SENDER_PUBLIC_KEY}
                disabled
                multiline={true}
                value={currentAccount?.publicKey}
                variant="outlined"
              />
            </div>
            <div>
              <FormLabel htmlFor={ID_MESSAGE}>Enter your message</FormLabel>
              <TextField
                multiline
                fullWidth
                rows={10}
                id={ID_MESSAGE}
                onChange={handleChange}
                value={message}
                variant="outlined"
                placeholder="Enter your message here..."
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button type="reset" variant="contained" color={'primary'}>Clear</Button>
              <Button type="submit" style={{marginLeft: 24}} variant="contained" color={'primary'}>Send</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ComposePage;
