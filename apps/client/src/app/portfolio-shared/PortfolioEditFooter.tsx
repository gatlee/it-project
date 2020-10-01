import React from 'react';
import { Container } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioEditFooter = () => {
  const { user } = useAuth0();
  const link = `/u/${user.nickname}`;

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
          You are in edit mode. To see what this looks like to the public,{' '}
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

export { PortfolioEditFooter };
