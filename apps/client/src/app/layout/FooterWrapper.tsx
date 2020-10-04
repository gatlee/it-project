import React from 'react';

interface FooterWrapper {
  footer: React.ReactNode;
  children: React.ReactNode;
  hidden?: boolean;
}

//This component enables the use of a footer around any top level page
const FooterWrapper = (props: FooterWrapper): React.ReactElement => {
  return !props.hidden ? (
    <div className="d-flex flex-column min-vh-100">
      {props.children}
      <div className="fixed-bottom">{props.footer} </div>
    </div>
  ) : (
    <>props.children</>
  );
};

export { FooterWrapper };
