import React from 'react';
import { Container } from 'react-bootstrap';

interface PortfolioEditFooter {
  handleViewPublic: () => void;
}

const PortfolioEditFooter = (props: PortfolioEditFooter) => {
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
          You are in edit mode. To see what this looks like to the public click{' '}
          <a style={textLinkStyle} onClick={props.handleViewPublic} href="/">
            <b>here</b>
          </a>
        </span>
      </Container>
    </footer>
  );
};

export { PortfolioEditFooter };
