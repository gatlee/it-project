import React, { useContext } from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';
import { UserContext } from './UserContext';

// Footer displayed on the edit page
const PortfolioEditFooter = () => {
  const { username } = useContext(UserContext);
  console.log(username);
  const link = `/u/${username}`;

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
