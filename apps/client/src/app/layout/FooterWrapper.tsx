import React from 'react';

interface FooterWrapper {
  footer: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'white',
    minHeight: '40px',
    lineHeight: '40px',
    background: '#0275D8',
    boxShadow: '0px 0 20px rgba(0, 0, 0, 0.8)',
    fontFamily: 'roboto',
  };

  return !props.hidden ? (
    <footer className="fixed-bottom text-center pb-2" style={footerStyle}>
      {props.footer}
    </footer>
  ) : null;
};

export { FooterWrapper };
