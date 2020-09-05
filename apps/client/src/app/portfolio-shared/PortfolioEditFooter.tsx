import React from 'react';
import { Container } from 'react-bootstrap';

const PortfolioEditFooter = () => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    padding: '5px',
  };

  return (
    <>
      <div style={{ display: 'block' }}></div>
      <footer style={footerStyle}>
        <Container style={{ textAlign: 'center' }}>
          <span>
            You are in edit mode. To see what this looks like to the public
            click click <b>here</b>
          </span>
        </Container>
      </footer>
    </>
  );
};

export { PortfolioEditFooter };
