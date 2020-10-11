import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface ViewAsButton {
  target: string;
  content: string;
  isSmall?: boolean;
}

// Button to change view between editor/visitor
const ViewAsButton = (props: ViewAsButton) => {
  return (
    <LinkContainer to={props.target} className="pointer">
      {props.isSmall ? (
        <Button variant="light px-3 py-0 mx-2" size="sm">
          <FontAwesomeIcon icon={faExternalLinkAlt} />
          <p className="my-0">{props.content}</p>
        </Button>
      ) : (
        <Button variant="light mr-4" className="py-1 px-3">
          <span className="mx-1">
            {props.content}
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
          </span>
        </Button>
      )}
    </LinkContainer>
  );
};

export default ViewAsButton;
