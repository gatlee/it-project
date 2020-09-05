import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PortfolioEditFooter {
  user: string;
  handleViewPublic: () => void;
}

const PortfolioEditFooter = (props) => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    padding: '5px',
  };

  const textLinkStyle = {
    cursor: 'pointer',
  };

  return (
    <>
      <div style={{ display: 'block' }}></div>
      <footer style={footerStyle}>
        <Container style={{ textAlign: 'center' }}>
          <span>
            You are in edit mode. To see what this looks like to the public
            click{' '}
            <a style={textLinkStyle} onClick={props.handleViewPublic}>
              <b>here</b>
            </a>
          </span>
        </Container>
      </footer>
    </>
  );
};

export { PortfolioEditFooter };
