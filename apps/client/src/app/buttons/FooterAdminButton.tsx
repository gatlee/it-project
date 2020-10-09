import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

// Button to return to the admin page
const FooterAdminButton = () => {
  return (
    <LinkContainer to="/admin">
      <Button variant="light" className="">
        <span>
          <ArrowLeft className="mr-1" />
          Admin
        </span>
      </Button>
    </LinkContainer>
  );
};

export default FooterAdminButton;
