import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegistrationPage from './RegistrationPage'
import LoginPage from './LoginPage'
import NewsFeed from './NewsFeed';
import { isRegistration, isLogin, isNewsFeed } from './RegisterLoginHandler';

var display = (<h1>default</h1>);
if (isRegistration)
  display = (<RegistrationPage />)
if (isLogin)
  display = (<LoginPage />)
if (isNewsFeed)
  display = (<NewsFeed />)

ReactDOM.render(
  <React.StrictMode>
    {display}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
