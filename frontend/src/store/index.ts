import {combineReducers} from 'redux';
import {sidebarReducer} from 'store/Sidebar';
import {curiumReducer} from 'store/Curium';
import {accountsReducer} from 'store/Account';
import {loaderReducer} from 'store/Loader';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer, persistStore} from 'redux-persist'
import {composeReducer} from 'store/Compose';
import {configureStore} from '@reduxjs/toolkit';

const appReducer = combineReducers({
  loaderState: loaderReducer,
  accountsState: accountsReducer,
  composeState: composeReducer,
  curiumState: curiumReducer,
  sidebarState: sidebarReducer,
})

let devTools: boolean = false;

// we use redux-devtools-extension during development and not in production
if (process.env.NODE_ENV==="development") {
  devTools = true;
}

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: []
  blacklist: ['register']
};

export type AppState = ReturnType<typeof appReducer>

const persistedReducer = persistReducer(persistConfig, appReducer);
//export const store = createStore(persistedReducer, undefined, composedEnhancer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools,
  middleware: (getDefaultMiddleware) => [
    // Ref https://github.com/rt2zz/redux-persist/issues/988
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: ["persist/PERSIST"]}}),
  ],
});
export const persistor = persistStore(store);


