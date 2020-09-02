import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GetStartedButton = () => {
  return (
    <Link to="/signup">
      <Button variant="primary">Get Started!</Button>
    </Link>
  );
};

export default GetStartedButton;
