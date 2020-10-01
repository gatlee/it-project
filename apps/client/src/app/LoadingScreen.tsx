import React from 'react';
import { Container, Row, Image, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from './layout/CenteredRowContent';

const LoadingScreen = () => {
  return (
    <Container>
      <Row>
        <CenteredRowContent>
          <Image
            className="mt-5"
            src="https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg"
            height="150"
          />
        </CenteredRowContent>
      </Row>
      <Row>
        <CenteredRowContent>
          <h1>Loading</h1>
        </CenteredRowContent>
      </Row>
      <Row className="mt-5">
        <CenteredRowContent>
          <Spinner animation="border" />
        </CenteredRowContent>
      </Row>
    </Container>
  );
};

export { LoadingScreen };
