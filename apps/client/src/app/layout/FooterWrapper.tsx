import React from 'react';
import { css } from '@emotion/core';

interface FooterWrapper {
  footer: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    color: 'white',
    minHeight: '43px',
    lineHeight: '43px',
    background: '#0275D8',
    boxShadow: '0px 0 10px rgba(0, 0, 0, 0.6)',
    fontFamily: 'roboto',
    '.btn': {
      color: '#373A3C',
      fontWeight: 'bold' as const,
    },
  };

  return !props.hidden ? (
    <footer className="fixed-bottom text-center pb-1" css={footerStyle}>
      {props.footer}
    </footer>
  ) : null;
};

export { FooterWrapper };
