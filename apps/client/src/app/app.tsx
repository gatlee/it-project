import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to portfolio!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="nx logo"
        />
      </div>
      <div>{m.message}</div>
      <Link to="/test">
        <h2>Click here to be routed to another page!</h2>
      </Link>
    </>
  );
};

export default App;
