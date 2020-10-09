import React from 'react';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

// Footer displayed when viewing your own portfolio as a visitor
const PortfolioViewFooter = () => {
  const link = `/edit`;

  return (
    <span>
      You are in view mode. To edit your portfolio,{' '}
      <LinkContainer to={link} className="pointer">
        <span>
          <b>click here</b>
          <BoxArrowUpRight className="ml-1" />
        </span>
      </LinkContainer>
    </span>
  );
};

export { PortfolioViewFooter };
