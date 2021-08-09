import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppState, CuriumAccount} from 'store';
import {BLUZELLE_CHAIN_ID} from 'config';
import {Key} from '@keplr-wallet/types';


const useCuriumAccount = () => {
  const accountsState = useSelector((appState: AppState) => appState.accountsState)
  const {currentAccount} = accountsState;
  const [curiumAccount, setCuriumAccount] = useState<undefined | CuriumAccount>(undefined);

  const checkAccount = useCallback(async () => {
    try {
      const results: Key | undefined = await window.keplr?.getKey(BLUZELLE_CHAIN_ID);
      if (results) {
        const publicKey = Buffer.from(results.pubKey).toString('hex');
        const address = Buffer.from(results.address).toString('hex');
        setCuriumAccount({
          address: address,
          algo: results.algo,
          bech32Address: results.bech32Address,
          name: results.name,
          pubKey: publicKey,
        });
      } else {
        setCuriumAccount(undefined);
      }
    } catch (e) {
      setCuriumAccount(undefined);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      await checkAccount();
    });
    return () => clearTimeout(timerId);
  }, [checkAccount, currentAccount])

  return [curiumAccount];
}

export default useCuriumAccount;
