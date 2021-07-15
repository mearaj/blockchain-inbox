import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {metamaskReducer} from 'store/Metamask';
import {sidebarReducer} from 'store/Sidebar';
import {curiumReducer} from 'store/Curium';
import {accountsReducer} from 'store/Account';
import {loaderReducer} from 'store/Loader';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'
import {composeReducer} from 'store/Compose';
import {configureStore} from '@reduxjs/toolkit';


// // the keys should map with combineReducers key
// export interface AppState {
//   loaderState: LoaderState,
//   accountsState: AccountsState,
//   metamaskState: MetamaskState,
//   curiumState: CuriumState,
//   sidebarState: SidebarState,
//   composeState: ComposeState,
// }


const appReducer = combineReducers({
  loaderState: loaderReducer,
  accountsState: accountsReducer,
  composeState: composeReducer,
  metamaskState: metamaskReducer,
  curiumState: curiumReducer,
  sidebarState: sidebarReducer,
})

let devTools: boolean;

// we use redux-devtools-extension during development and not in production
if (process.env.NODE_ENV==="development") {
  devTools = true;
} else {
  devTools = false;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

export type AppState = ReturnType<typeof appReducer>

const persistedReducer = persistReducer(persistConfig, appReducer);
//export const store = createStore(persistedReducer, undefined, composedEnhancer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools,
  middleware: [thunkMiddleware],
});
export const persistor = persistStore(store);


