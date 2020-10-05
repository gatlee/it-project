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
  };

  return !props.hidden ? (
    <div className="d-flex flex-column min-vh-100">
      {props.children}
      <footer className="fixed-bottom text-center p-1" style={footerStyle}>
        {props.footer}
      </footer>
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100">{props.children}</div>
  );
};

export { FooterWrapper };
