import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { SoftKeyProvider } from '../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../components/SoftKey/withSoftKeyManager';
import DataServices from './Utils/DataServices';
import { socketClient } from './Utils/PushNotification';
import Login from './views/Login';
import Country from './views/Country';
import AuthCode from './views/AuthCode';
import Chats from './views/Chats';
import Message from './views/Message';
import NewChat from './views/NewChat';
import StartPage from './views/StartPage';
import Page from './components/Page'
import { initializeFirebase }  from './Utils/PushNotification';
import * as serviceWorker from '../serviceWorker';
import '../App.scss';
// import './index.scss';

// const socket = socketClient(process.env.REACT_APP_BASE_URL);
const socket = '';
class App extends Component {
    
    componentDidMount(){
      initializeFirebase();
      serviceWorker.register();
    }

    render() {
        return (
        	<SoftKeyProvider>
            <div className="App">
		      	<Switch>
		      	  { /* <Route exact path="/" component={StartPage}></Route> */ }
              <Route exact path="/" render={() => {
                return <Login socket={socket} />
              }}></Route>
              <Route path="/country" component={Country}></Route>
              <Route path="/auth" component={AuthCode}></Route>
              <Route path="/chats" render={() => {
                return <Chats socket={socket} />
              }}></Route>
              <Route path="/message/:id/:title" render={() => {
                return <Message socket={socket} />
              }}></Route> 
              <Route path="/newchat" component={NewChat}></Route> 
		      	</Switch>
      		</div>
      		</SoftKeyProvider>
        );
    }
}
export default App;