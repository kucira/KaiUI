import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { SoftKeyProvider } from '../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../components/SoftKey/withSoftKeyManager';
import Home from './views/Home';
import SearchRoute from './views/SearchRoute';
import RouteBusway from './views/RouteBusway';
import DetailRoute from './views/DetailRoute';
import '../App.scss';
// import './index.scss';


class App extends Component {

    render() {
        return (
        	<SoftKeyProvider>
            <div className="App">
		      	<Switch>
              <Route exact path="/" component={SearchRoute}></Route>
              <Route path="/busway" component={Home}></Route>
              <Route path="/route/:id/:type" component={RouteBusway}></Route>
              <Route path="/times/:id/:trackId/:stopId" component={DetailRoute}></Route>
		      	</Switch>
      		</div>
      		</SoftKeyProvider>
        );
    }
}
export default App;