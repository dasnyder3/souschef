import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainContainer from './Containers/MainContainer.jsx';
import Login from './Components/Login.jsx';
import Nav from 'react-bootstrap/Nav';
import './styles.scss';

// import './App.css';

const App = () => {
  return (
    <Router>
      <Nav defaultActiveKey='/'>
        <Nav.Item>
          <Nav.Link href='/'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item className='m1-auto'>
          <Nav.Link href='/logout'>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
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
