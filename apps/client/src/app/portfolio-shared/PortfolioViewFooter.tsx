import React from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';

// Footer displayed when viewing your own portfolio as a visitor
const PortfolioViewFooter = () => {
  const link = `/edit`;

  return (
    <span>
      <FooterAdminButton />
      <EditThemeButton />
      You are viewing this portfolio as a visitor
      <ViewAsButton target={link} content={'View as editor'} />
    </span>
  );
};

export { PortfolioViewFooter };
