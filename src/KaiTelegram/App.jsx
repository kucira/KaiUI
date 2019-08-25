import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { SoftKeyProvider } from '../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../components/SoftKey/withSoftKeyManager';
import Login from './views/Login';
import Country from './views/Country';
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
		      	</Switch>
      		</div>
      		</SoftKeyProvider>
        );
    }
}
export default App;