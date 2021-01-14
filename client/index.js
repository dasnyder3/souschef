import { Router } from 'express';
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
// import routes from './routes.jsx'

// render (
//   <Router routes={routes} />,
//   document.getElementById('app')
// )

render (<App />, 
  document.getElementById('app'));