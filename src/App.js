import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import ChatContainer from './containers/ChatContainer/ChatContainer';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Settings from './containers/Settings/Settings';
import firebase from 'firebase';
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    actions.listenToAuthStateChange();
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/" component={ChatContainer}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
