import React from 'react';

interface FooterWrapper {
  footer: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'black',
  };

  return !props.hidden ? (
    <footer className="fixed-bottom text-center p-1" style={footerStyle}>
      {props.footer}
    </footer>
  ) : null;
};

export { FooterWrapper };
