import {combineReducers, createStore} from 'redux';
import {accountReducer, AccountState} from 'store/Account';
import {metamaskReducer, MetamaskState} from 'store/Metamask';
import {sidebarReducer, SidebarState} from 'store/Sidebar';
import {curiumReducer, CuriumState} from 'store/Curium';

// the keys should map with combineReducers key
export interface AppState {
  accountState: AccountState,
  metamaskState: MetamaskState,
  curiumState: CuriumState,
  sidebarState: SidebarState,
}
const appReducer = combineReducers({
  accountState: accountReducer,
  sidebarState: sidebarReducer,
  metamaskState: metamaskReducer,
  curiumState: curiumReducer,
})

const store = createStore(appReducer);

export default store;
