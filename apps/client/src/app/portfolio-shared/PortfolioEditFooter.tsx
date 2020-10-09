import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';

// Footer displayed on the edit page
const PortfolioEditFooter = () => {
  const { user } = useAuth0();
  const link = `/u/${user.nickname}`;

  return (
    <span>
      <FooterAdminButton />
      <EditThemeButton />
      You are editing this portfolio.
      <ViewAsButton target={link} content={'View as visitor'} />
    </span>
  );
};

export { PortfolioEditFooter };
