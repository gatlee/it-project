import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronUp } from 'react-bootstrap-icons';

// Button to trigger the theme editor modal
const EditThemeButton = () => {
  return (
    <Button variant="light" className="">
      <span>
        Edit Theme
        <ChevronUp className="ml-1" />
      </span>
    </Button>
  );
};

export default EditThemeButton;
