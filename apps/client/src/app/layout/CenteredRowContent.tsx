import { Col } from 'react-bootstrap';
import React from 'react';

interface CenteredRowContent {
  children: React.ReactNode;
}

// This component centers its child horizontally
// This is to be used within a <Row> component
const CenteredRowContent = (props: CenteredRowContent) => {
  return (
    <>
      <Col></Col>
      <Col xs="auto">{props.children}</Col>
      <Col></Col>
    </>
  );
};

export { CenteredRowContent };
