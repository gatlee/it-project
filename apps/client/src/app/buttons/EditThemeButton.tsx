import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronUp } from 'react-bootstrap-icons';

// Button to trigger the theme editor modal
const EditThemeButton = () => {
  return (
    <Button variant="light" className="">
      <span className="mx-1">
        Edit Theme
        <ChevronUp className="ml-2" style={{ marginBottom: '0.1rem' }} />
      </span>
    </Button>
  );
};

export default EditThemeButton;
