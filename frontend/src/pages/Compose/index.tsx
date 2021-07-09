import React from 'react';
import CommonBar from 'components/CommonBar';
import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';
import {Button, Card, CardContent, TextField} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'store';
import CommonCardHeader from 'components/CommonCardHeader';
import {composeActions} from 'store/Compose';
import {Message} from 'api';
import {sendMessage} from 'store/Message/thunk';
import {loaderActions} from 'store/Loader';
import {CHAIN_ID} from 'config';
import {coin} from '@cosmjs/proto-signing';
import {BroadcastMode, makeStdTx, MsgDelegate, MsgSend, StdTx} from '@cosmjs/launchpad';
import {Coin} from '@cosmjs/amino';

const ComposePage: React.FC = () => {
  const classes = useStyles();
  const accountsState = useSelector((state: AppState) => state.accountsState);
  const composeState = useSelector((state: AppState) => state.composeState);
  const {to, message} = composeState;
  const {currentAccount} = accountsState;
  const dispatch = useDispatch()
  const ID_TO = "ID_TO";
  const ID_MESSAGE = "ID_MESSAGE"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ID = event.target.id;
    const value = event.target.value;
    switch (ID) {
      case ID_TO:
        dispatch(composeActions.setTo(value));
        break;
      case ID_MESSAGE:
        dispatch(composeActions.setMessage(value));
    }
  }
  // useEffect(() => {
  //   dispatch(composeActions.setTo(to));
  //   dispatch(composeActions.setFrom(from));
  // },[dispatch, from, to])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let message: Message =
      {
        message: composeState.message,
        from: composeState.from,
        to: composeState.to
      }
    dispatch(loaderActions.showLoader());
    setTimeout(async () => {
      await dispatch(sendMessage(message));
      await dispatch(loaderActions.hideLoader());
      const msg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: currentAccount,
          to_address: "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah",
          amount: [coin(1000000, "BLZ")],
        }
      };

      const result = await window.keplr!.signAmino(CHAIN_ID, currentAccount, {
        account_number: currentAccount,
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
        <CommonBarHeader>
          Compose
        </CommonBarHeader>
      </CommonBar>
      <Card>
        <CommonCardHeader/>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth={true}
                label="To"
                onChange={handleChange}
                value={to}
                id={ID_TO}
                placeholder="Enter recipient wallet address here"
              />
            </div>
            <br/>
            <div>
              <TextField
                fullWidth={true}
                label="From"
                disabled
                value={currentAccount}
              />
            </div>
            <br/>
            <div>
              <TextField
                multiline
                fullWidth
                rows={10}
                id={ID_MESSAGE}
                onChange={handleChange}
                value={message}
                variant="outlined"
                label="Message"
              />
            </div>
            <br/>
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
