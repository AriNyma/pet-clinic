import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Doctor from './Pages/Doctor';
import Owner from './Pages/Owner';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/doctor" component={Doctor} />
        <Route path="/owner" component={Owner} />
      </Switch>
    </Router>
  );
}

export default App;