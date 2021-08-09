import {AppState} from 'store';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {bluzelleChain} from 'chains';
import useCuriumAccount from 'hooks/useCuriumAccount';


/**
 * This hook compares current account with curium extension's account and returns true or false based upon match
 */

export const useAccountMatch = () => {
  const currentAccount = useSelector((appState: AppState) => appState.accountsState.currentAccount);
  const [curiumAccount] = useCuriumAccount();
  const [found, setFound] = useState(false);

  useEffect(() => {
    const isMatched = !!(
      currentAccount &&
      curiumAccount &&
      currentAccount.publicKey===curiumAccount.pubKey &&
      currentAccount.chainName===bluzelleChain.name &&
      window.keplr);
    // Only update when current state mismatches
    if (isMatched !== found) {
      setFound(isMatched);
    }
  }, [currentAccount, curiumAccount, found])

  return [found];
}
