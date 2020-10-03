import React from 'react';
import { Container } from 'react-bootstrap';

interface FooterWrapper {
  footer: React.ReactNode;
  children: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    padding: '5px',
  };

  return !props.hidden ? (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1 }}> {props.children} </div>
      <footer style={footerStyle}>
        <Container style={{ textAlign: 'center' }}>{props.footer}</Container>
      </footer>
    </div>
  ) : (
    <>{props.children}</>
  );
};

export { FooterWrapper };
