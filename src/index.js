import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { setGlobal } from 'reactn';
import App from './App';
import AppTele from './KaiTelegram/App.jsx';
import * as serviceWorker from './serviceWorker';

setGlobal({
  login: {
  	country:null,
  	phoneNumber:'',
  	authCode:'',
  	generateCode: false,
  }
});


ReactDOM.render(
	<Router>
		<AppTele />
	</Router>, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();