// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './components/header';
import Main from './components/Main';
import store from './store'
import {loadUser} from './actions/authActions';
import { BrowserRouter as Router } from 'react-router-dom'
class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store} >
        <Router>
          <Main/>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
