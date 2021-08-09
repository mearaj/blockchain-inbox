import {combineReducers} from 'redux';
import {loaderReducer} from 'store/Loader';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';
import {alertMessageReducer} from 'store/AlertMessage';
import {sidebarReducer} from 'store/Sidebar/reducers';
import {accountsReducer} from 'store/Account/reducers';
import {messagesReducer} from 'store/Messages';

const appReducer = combineReducers({
  accountsState: accountsReducer,
  messagesState: messagesReducer,
  alertMessageState: alertMessageReducer,
  loaderState: loaderReducer,
  sidebarState: sidebarReducer,
})

export const persistConfig = {
  key: 'root',
  storage,
  //whitelist: []
  blacklist: ['register', 'loaderState']
};

export type AppState = ReturnType<typeof appReducer>
export const persistedReducer = persistReducer(persistConfig, appReducer);
