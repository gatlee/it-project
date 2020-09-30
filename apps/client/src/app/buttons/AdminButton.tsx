import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminButton = () => {
  return (
    <LinkContainer to="/admin">
      <Button variant="light" className="mr-2">
        Admin
      </Button>
    </LinkContainer>
  );
};

export default AdminButton;
