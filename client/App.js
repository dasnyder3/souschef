import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainContainer from './Containers/MainContainer.jsx';
import Login from './Components/Login.jsx';
import './styles.scss';

// import './App.css';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/logout'>Logout</a>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <MainContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
