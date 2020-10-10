import React from 'react';
import { Button } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

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
          <BoxArrowUpRight />
          <p className="my-0">{props.content}</p>
        </Button>
      ) : (
        <Button variant="light mr-4" className="py-1">
          <span className="mx-1">
            {props.content}
            <BoxArrowUpRight className="ml-2 mb-1" />
          </span>
        </Button>
      )}
    </LinkContainer>
  );
};

export default ViewAsButton;
