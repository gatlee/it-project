import React from 'react';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioViewFooter = () => {
  const link = `/edit`;

  return (
    <span>
      You are in view mode. To edit your portfolio,{' '}
      <LinkContainer to={link} style={{ cursor: 'pointer' }}>
        <span>
          <b>click here</b>
          <BoxArrowUpRight className="ml-1" />
        </span>
      </LinkContainer>
    </span>
  );
};

export { PortfolioViewFooter };
