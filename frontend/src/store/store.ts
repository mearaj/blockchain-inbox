//export const store = createStore(persistedReducer, undefined, composedEnhancer);
import {configureStore} from '@reduxjs/toolkit';
import {persistedReducer} from 'store/reducer';
import {persistStore} from 'redux-persist';
import {rootSaga, sageMiddleware} from 'store/saga';


let devTools: boolean = false;

// we use redux-devtools-extension during development and not in production
if (process.env.NODE_ENV==="development") {
  devTools = true;
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools,
  middleware: (getDefaultMiddleware) => [
    // Ref https://github.com/rt2zz/redux-persist/issues/988
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: ["persist/PERSIST"]}, thunk: false}),
    sageMiddleware,
  ],
});

sageMiddleware.run(rootSaga);

export const persistor = persistStore(store);

