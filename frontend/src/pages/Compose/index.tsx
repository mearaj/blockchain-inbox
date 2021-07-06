import React from 'react';
import CommonBar from 'components/CommonBar';
import {BroadcastMode,} from "@cosmjs/launchpad";
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
import * as buffer from 'buffer';

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
      if (window.keplr) {
        const result = await window.keplr.getKey(CHAIN_ID);
        const result2 = window.keplr.getEnigmaUtils(CHAIN_ID);
        console.log(result)
        console.log(result2)
        const pubKey = await result2.getPubkey();
        console.log(pubKey);
        console.log(buffer.Buffer.from(pubKey).toString('hex'));


        // const result = await window.keplr.signAmino(
        //   CHAIN_ID,
        //   currentAccount,
        //   {
        //     fee:{
        //       amount: [coin(1, "ubnt")],
        //       gas:'1'
        //     },
        //     chain_id:CHAIN_ID,
        //     account_number: "",
        //     memo:'',
        //     sequence: '',
        //     msgs: [{type:"bluzelle", value:"bluzelle"}]
        //   }
        // );
        // console.log(result);
        // const result2 = await window.keplr.sendTx(
        //   CHAIN_ID,
        //   {
        //     msg: [{type:"bluzelle", value:"bluzelle"}],
        //     fee: {
        //       amount: [coin(1, "ubnt")],
        //       gas:'1'
        //     },
        //     signatures: [result.signature],
        //     memo: "my memo 1"
        //   },
        //   BroadcastMode.Async
          // currentAccount,
          // {
          //   fee:
          //   chain_id:CHAIN_ID,
          //   account_number: "",
          //   memo:'',
          //   sequence: '',
          //   msgs: [{type:"bluzelle", value:"bluzelle"}]
          // }
        //);
        //console.log(result2);



        //const offlineSigner = (window as any).keplr.getOfflineSigner(CHAIN_ID);
        // const cosmJS = new SigningCosmosClient(
        //   "https://lcd-cosmoshub.keplr.app/rest",
        //   currentAccount,
        //   offlineSigner,
        // );
        // await cosmJS.sign([{type:'',value:''}], {amount:[coin(1,"uatom")], gas:"1"}, undefined)
        // console.log(cosmJS);
        // console.log(accountsState);
        // const result = await window.keplr.signAmino("bluzelle1ns5julcqlw8yx8umjklg5ggrq8waphmw04sgqn", [{
        //   denom: "ubnt",
        //   amount: "1",
        // }]);
        //console.log(result);
      //  const result = window.keplr.sendTx(
      //     CHAIN_ID,
      //    {
      //      memo: undefined, signatures: [],
      //      msg: [{type:'', value:''}],
      //      fee: {
      //        amount: [coin(0,"ubnt")],
      //        gas: "1"
      //      }
      //    },
      //     BroadcastMode.Async
      // );

        //console.log(result);
        // const result = await cosmJS.signDirect(
        //   CHAIN_ID,
        //   currentAccount,
        //   {
        //     bodyBytes: new Uint8Array(8888),
        //     chainId: CHAIN_ID,
        //     fee: {
        //       amount: [coin(1, "ubnt")],
        //       gas: "1",
        //     },
        //     accountNumber: new Long(0),
        //   },
        //   // {
        //   //   preferNoSetFee: true,
        //   //   preferNoSetMemo: true,
        //   // }
        // );
        // const result = await cosmJS.sendTokens("bluzelle1dejhaexn6n75mf5v8q2f8aghchh6tekkapyems", [{
        //   denom: "uatom",
        //   amount: "1",
        // }]);
        //console.log(result);
        //console.log(Buffer.from(result).toString('hex'));
      }
      //console.log(result);
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
