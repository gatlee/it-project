import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

interface EditThemeButton {
  isSmall?: boolean;
}

// Button to return to the admin page
const FooterAdminButton = (props: EditThemeButton) => {
  return (
    <LinkContainer to="/admin">
      {props.isSmall ? (
        <Button variant="light px-3 py-0 mx-2" size="sm">
          <ArrowLeft />
          <p className="my-0">Admin</p>
        </Button>
      ) : (
        <Button variant="light" className="mr-3 ml-4">
          <span className="mx-1">
            <ArrowLeft className="mr-2" style={{ marginBottom: '0.1rem' }} />
            Admin
          </span>
        </Button>
      )}
    </LinkContainer>
  );
};

export default FooterAdminButton;
