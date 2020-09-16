import React from 'react';

interface FooterWrapper {
  footer: React.ReactNode;
  children: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  return !props.hidden ? (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1 }}> {props.children}</div>
      {props.footer}
    </div>
  ) : (
    props.children
  );
};

export { FooterWrapper };
