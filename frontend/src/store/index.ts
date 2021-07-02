import {combineReducers, createStore} from 'redux';
import {Account, accountReducer} from 'store/Account';
import {metamaskReducer, MetamaskState} from 'store/Metamask';
import {sidebarReducer, SidebarState} from 'store/Sidebar';
import {curiumReducer, CuriumState} from 'store/Curium';
import {Accounts, accountsReducer} from 'store/Accounts';

// the keys should map with combineReducers key
export interface AppState {
  accountState: Account,
  accountsState: Accounts,
  metamaskState: MetamaskState,
  curiumState: CuriumState,
  sidebarState: SidebarState,
}

const appReducer = combineReducers({
  accountState: accountReducer,
  accountsState: accountsReducer,
  sidebarState: sidebarReducer,
  metamaskState: metamaskReducer,
  curiumState: curiumReducer,
})

const store = createStore(appReducer);

export default store;
