import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PortfolioAvatar } from './PortfolioAvatar';
import { CenteredRowContent } from '../layout/CenteredRowContent';

const PortfolioHome = () => {
  return (
    <Container>
      <Row>
        <CenteredRowContent>
          <PortfolioAvatar />
        </CenteredRowContent>
      </Row>
    </Container>
  );
};

export { PortfolioHome };
