import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {metamaskReducer, MetamaskState} from 'store/Metamask';
import {sidebarReducer, SidebarState} from 'store/Sidebar';
import {curiumReducer, CuriumState} from 'store/Curium';
import {accountsReducer, AccountsState} from 'store/Account';
import {composeWithDevTools} from 'redux-devtools-extension';
import {loaderReducer, LoaderState} from 'store/Loader';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'


// the keys should map with combineReducers key
export interface AppState {
  loaderState: LoaderState,
  accountsState: AccountsState,
  metamaskState: MetamaskState,
  curiumState: CuriumState,
  sidebarState: SidebarState,
  serializableCheck: false
}


const appReducer = combineReducers({
  loaderState: loaderReducer,
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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['accountsState']
};

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = createStore(persistedReducer, undefined, composedEnhancer);
export const persistor = persistStore(store);
