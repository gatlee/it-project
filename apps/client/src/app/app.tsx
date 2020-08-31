import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/test">
          <h1>Hello World!</h1>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
