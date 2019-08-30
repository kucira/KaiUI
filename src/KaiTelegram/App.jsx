import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { SoftKeyProvider } from '../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../components/SoftKey/withSoftKeyManager';
import Login from './views/Login';
import Country from './views/Country';
import AuthCode from './views/AuthCode';
import Chats from './views/Chats';
import Message from './views/Message';
import NewChat from './views/NewChat';
import Page from './components/Page'
import '../App.scss';
// import './index.scss';


class App extends Component {

    render() {
        return (
        	<SoftKeyProvider>
            <div className="App">
		      	<Switch>
		      	  <Route exact path="/" component={Page(Login)}></Route>
              <Route path="/country" component={Page(Country)}></Route>
              <Route path="/auth" component={Page(AuthCode)}></Route>
              <Route path="/chats" component={Page(Chats)}></Route>
              <Route path="/message/:id/:title" component={Page(Message)}></Route> 
              <Route path="/newchat" component={Page(NewChat)}></Route> 
		      	</Switch>
      		</div>
      		</SoftKeyProvider>
        );
    }
}
export default App;