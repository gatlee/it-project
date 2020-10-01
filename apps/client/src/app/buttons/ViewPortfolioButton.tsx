import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const ViewPortfolioButton = () => {
  const { user } = useAuth0();
  const { nickname } = user;

  return (
    <LinkContainer to={`/u/${nickname}`}>
      <Button variant="primary" className="mr-2">
        Your Portfolio
      </Button>
    </LinkContainer>
  );
};

export default ViewPortfolioButton;
