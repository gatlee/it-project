import React from 'react';
import { Button } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

interface ViewAsButton {
  target: string;
  content: string;
}

// Button to change view between editor/visitor
const ViewAsButton = (props: ViewAsButton) => {
  return (
    <LinkContainer to={props.target} className="pointer">
      <Button variant="light">
        <span>
          {props.content}
          <BoxArrowUpRight className="ml-1" />
        </span>
      </Button>
    </LinkContainer>
  );
};

export default ViewAsButton;
