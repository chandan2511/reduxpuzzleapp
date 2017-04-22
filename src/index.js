import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import App from './App';
import './index.css';
import games from './gameReducer';
const store = createStore(games,applyMiddleware(logger));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
