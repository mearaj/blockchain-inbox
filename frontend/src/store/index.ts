import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Account, accountReducer} from 'store/Account';
import {metamaskReducer, MetamaskState} from 'store/Metamask';
import {sidebarReducer, SidebarState} from 'store/Sidebar';
import {curiumReducer, CuriumState} from 'store/Curium';
import {Accounts, accountsReducer} from 'store/Accounts';
import {composeWithDevTools} from 'redux-devtools-extension';

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

let composedEnhancer: any;

// we use redux-devtools-extension during development and not in production
if (process.env.NODE_ENV==="development") {
  composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
} else {
  composedEnhancer = applyMiddleware(thunkMiddleware);
}


const store = createStore(appReducer, composedEnhancer);

export default store;
