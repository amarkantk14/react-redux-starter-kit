import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <App/>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
