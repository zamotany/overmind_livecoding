import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'overmind-react';
import './styles/global.css';
import { App } from './App';
import { overmind } from './overmind/overmind';

render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.getElementById('root')
);
