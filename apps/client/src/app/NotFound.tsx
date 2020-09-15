import React from 'react';
import { Container, Row, Image, Button } from 'react-bootstrap';
import { CenteredRowContent } from './layout/CenteredRowContent';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
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
          <h1>404 Not Found</h1>
        </CenteredRowContent>
      </Row>
      <Row>
        <CenteredRowContent>
          <LinkContainer to="/">
            <Button className="mt-3" variant="light">
              Return Home
            </Button>
          </LinkContainer>
        </CenteredRowContent>
      </Row>
    </Container>
  );
};

export { NotFound };
