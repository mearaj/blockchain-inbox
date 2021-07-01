import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import './index.css';
import App from './pages';

import theme from 'styles/theme';
import {Provider} from 'react-redux';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
