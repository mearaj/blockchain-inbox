import {AppState} from 'store';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {bluzelleChain} from 'chains';


/**
 * This hook compares current account with curium extension's account and returns true or false based upon match
 */

export const useAccountMatch = () => {
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const curiumAccount = useSelector((appState: AppState) => appState.accountsState.curiumAccount);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const isMatched = !!(
      currentAccount &&
      curiumAccount &&
      currentAccount.publicKey===curiumAccount.pubKey &&
      currentAccount.chainName===bluzelleChain.name &&
      window.keplr);
    if (isMatched !== found) {
      setFound(isMatched);
    }
  }, [currentAccount, curiumAccount, found])

  return [found];
}
