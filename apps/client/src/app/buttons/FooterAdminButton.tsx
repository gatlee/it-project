import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

interface EditThemeButton {
  isSmall?: boolean;
}

// Button to return to the admin page
const FooterAdminButton = (props: EditThemeButton) => {
  return (
    <LinkContainer to="/admin">
      {props.isSmall ? (
        <Button variant="light px-3 py-0 mx-2" size="sm">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
          <p className="my-0">Admin</p>
        </Button>
      ) : (
        <Button variant="light" className="mr-3 ml-4 py-1 px-3">
          <span className="mx-1">
            <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2" />
            Admin
          </span>
        </Button>
      )}
    </LinkContainer>
  );
};

export default FooterAdminButton;
