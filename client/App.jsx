import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainContainer from './Containers/MainContainer.jsx';
import Login from './Components/Login.jsx';
import './styles.scss';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
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
