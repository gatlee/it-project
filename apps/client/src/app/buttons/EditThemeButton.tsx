import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronUp } from 'react-bootstrap-icons';

interface EditThemeButton {
  isSmall?: boolean;
}

// Button to trigger the theme editor modal
const EditThemeButton = (props: EditThemeButton) => {
  return (
    <>
      {props.isSmall ? (
        <Button variant="light px-3 py-0 mx-2" size="sm">
          <ChevronUp />
          <p className="my-0 font-weight-bold">Edit Theme</p>
        </Button>
      ) : (
        <Button variant="light" className="py-1 px-3">
          <span className="mx-1">
            Edit Theme
            <ChevronUp className="ml-2" style={{ marginBottom: '0.1rem' }} />
          </span>
        </Button>
      )}
    </>
  );
};

export default EditThemeButton;
