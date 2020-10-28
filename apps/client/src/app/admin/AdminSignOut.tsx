import { useAuth0 } from '@auth0/auth0-react';
import { css } from 'emotion';
import React from 'react';

const AdminSignOut = () => {
  const { logout } = useAuth0();

  const style = css({
    font: 'Roboto',
  });

  return (
    <span
      className={'p-2 pointer ' + style}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
          // window.location.origin stores the domain of the current page/window
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
          // thus, logging out redirects to the origin.
        })
      }
    >
      <b>Sign Out</b>
    </span>
  );
};

export { AdminSignOut };
