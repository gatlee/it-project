import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/test">
          <h1>Hello World!</h1>
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
