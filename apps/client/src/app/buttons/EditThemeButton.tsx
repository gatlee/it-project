import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface EditThemeButton {
  isSmall?: boolean;
  onClick: () => void;
}

// Button to trigger the theme editor modal
const EditThemeButton = (props: EditThemeButton) => {
  return props.isSmall ? (
    <Button variant="light px-3 py-0 mx-2" size="sm" onClick={props.onClick}>
      <FontAwesomeIcon icon={faChevronUp} />
      <p className="my-0">Edit Theme</p>
    </Button>
  ) : (
    <Button variant="light" className="py-1 px-3" onClick={props.onClick}>
      <span className="mx-1">
        Edit Theme
        <FontAwesomeIcon icon={faChevronUp} className="ml-2" />
      </span>
    </Button>
  );
};

export default EditThemeButton;
