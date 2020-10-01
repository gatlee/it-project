import React from 'react';
import { Container } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioViewFooter = () => {
  const link = `/edit`;
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    padding: '5px',
  };

  const textLinkStyle = {
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyle}>
      <Container style={{ textAlign: 'center' }}>
        <span>
          You are in view mode. To edit your portfolio,{' '}
          <LinkContainer to={link} style={{ cursor: 'pointer' }}>
            <span style={textLinkStyle}>
              <b>click here</b>
              <BoxArrowUpRight className="ml-1" />
            </span>
          </LinkContainer>
        </span>
      </Container>
    </footer>
  );
};

export { PortfolioViewFooter };
