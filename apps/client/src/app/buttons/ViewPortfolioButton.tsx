import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../portfolio-shared/UserContext';

const ViewPortfolioButton = () => {
  const { username } = useContext(UserContext);

  return (
    <LinkContainer to={`/u/${username}`}>
      <Button variant="primary" className="mr-2">
        Your Portfolio
      </Button>
    </LinkContainer>
  );
};

export default ViewPortfolioButton;
