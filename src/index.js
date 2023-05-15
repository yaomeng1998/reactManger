import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import userStorage from './utils/userStorage'
import userMemory from './utils/userMemory'
userMemory.user=userStorage.getUser()
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);
