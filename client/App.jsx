import React, {Component} from 'react';
// import { Switch, Route } from 'react-router-dom';
// import Login from './Components/Login.jsx';
// import Signup from './Components/Signup.jsx';
import MainContainer from './Containers/MainContainer.jsx';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Switch>
//           <Route path="/login" component={Login} />
//           <Route path="/signup" component={Signup} />
//           <Route path="/" component={MainContainer} />
//         </Switch>
//       </div>
//     )
//   }
// }


class App extends Component {
  render() {
    return (
      <div>
        <MainContainer />
      </div>
    )
  }
}

export default App;