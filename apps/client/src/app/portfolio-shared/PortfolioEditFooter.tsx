import React from 'react';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioEditFooter = () => {
  const { user } = useAuth0();
  const link = `/u/${user.nickname}`;

  return (
    <span>
      You are in edit mode. To see what this looks like to the public,{' '}
      <LinkContainer to={link} style={{ cursor: 'pointer' }}>
        <span>
          <b>click here</b>
          <BoxArrowUpRight className="ml-1" />
        </span>
      </LinkContainer>
    </span>
  );
};

export { PortfolioEditFooter };
