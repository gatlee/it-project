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
    height: '50px',
    lineHeight: '45px',
    background: '#0275D8',
    boxShadow: '0px 0 20px rgba(0, 0, 0, 0.8)',
  };

  return !props.hidden ? (
    <footer className="fixed-bottom text-center pb-2" style={footerStyle}>
      {props.footer}
    </footer>
  ) : null;
};

export { FooterWrapper };
