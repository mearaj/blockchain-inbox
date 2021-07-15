import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {PersistGate} from 'redux-persist/integration/react'
import './index.css';
import App from './pages';

import theme from 'styles/theme';
import {Provider} from 'react-redux';
import {persistor, store} from 'store';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline/>
          <App/>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

