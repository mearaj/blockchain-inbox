import {combineReducers} from 'redux';
import {loaderReducer} from 'store/Loader';
import {accountsReducer} from 'store/Account';
import {composeReducer} from 'store/Compose';
import {curiumReducer} from 'store/Curium';
import {sidebarReducer} from 'store/Sidebar';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';
import {alertMessageReducer} from 'store/AlertMessage';


const appReducer = combineReducers({
  alertMessageState: alertMessageReducer,
  loaderState: loaderReducer,
  accountsState: accountsReducer,
  composeState: composeReducer,
  curiumState: curiumReducer,
  sidebarState: sidebarReducer,
})

export const persistConfig = {
  key: 'root',
  storage,
  //whitelist: []
  blacklist: ['register']
};


export type AppState = ReturnType<typeof appReducer>
export const persistedReducer = persistReducer(persistConfig, appReducer);
