import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {metamaskReducer, MetamaskState} from 'store/Metamask';
import {sidebarReducer, SidebarState} from 'store/Sidebar';
import {curiumReducer, CuriumState} from 'store/Curium';
import {accountsReducer, AccountsState} from 'store/Account';
import {composeWithDevTools} from 'redux-devtools-extension';

// the keys should map with combineReducers key
export interface AppState {
  accountsState: AccountsState,
  metamaskState: MetamaskState,
  curiumState: CuriumState,
  sidebarState: SidebarState,
}


const appReducer = combineReducers({
  accountsState: accountsReducer,
  metamaskState: metamaskReducer,
  curiumState: curiumReducer,
  sidebarState: sidebarReducer,
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
