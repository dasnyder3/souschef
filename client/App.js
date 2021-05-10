import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainContainer from './Containers/MainContainer.jsx';
import Login from './Components/Login.jsx';
import Navigation from './Components/Navigation';
import './styles.scss';

// import './App.css';

const App = () => {
  const [user, updateUser] = useState({});
  useEffect(() => {
    fetch('auth/user')
      .then((res) => res.json())
      .then((data) => updateUser(data.user));
  }, []);
  return (
    <Router>
      <Navigation user={user} />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <MainContainer user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
