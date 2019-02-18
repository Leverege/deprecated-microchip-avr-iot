import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <App />
     </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
