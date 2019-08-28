import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { SoftKeyProvider } from '../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../components/SoftKey/withSoftKeyManager';
import Home from './views/Home';
import Quran from './views/Quran';
import Surah from './views/Surah';
import Video from './views/Video';
import Page from './components/Page'
import '../App.scss';
// import './index.scss';


class App extends Component {

    render() {
        return (
        	<SoftKeyProvider>
            <div className="App">
		      	<Switch>
		      	    <Route exact path="/" component={Page(Home)}></Route>
		        	<Route path="/quran" component={Page(Quran)}></Route>
              <Route path="/surah/:index" component={Page(Surah)}></Route>
              <Route path="/video" component={Page(Video)}></Route>
		      	</Switch>
      		</div>
      		</SoftKeyProvider>
        );
    }
}
export default App;