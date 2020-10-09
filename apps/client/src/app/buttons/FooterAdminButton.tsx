import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { css } from '@emotion/core';

// Button to return to the admin page
const FooterAdminButton = () => {
  const buttonStyle = {
    /*     'top': '50%',
    'position': 'absolute',
    'transform': 'translateY(-50%)' */
  };

  return (
    <LinkContainer to="/admin">
      <Button variant="light" className="mr-3 ml-4" css={buttonStyle}>
        <span className="mx-1">
          <ArrowLeft className="mr-2" style={{ marginBottom: '0.1rem' }} />
          Admin
        </span>
      </Button>
    </LinkContainer>
  );
};

export default FooterAdminButton;
