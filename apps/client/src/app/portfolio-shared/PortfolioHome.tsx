import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioAvatar } from './PortfolioAvatar';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { UploadBox } from '../UploadBox';

const PortfolioHome = () => {
  return (
    <Container>
      <Row>
        <CenteredRowContent>
          <PortfolioAvatar />
        </CenteredRowContent>
      </Row>
      <Row>
        <CenteredRowContent>
          <UploadBox />
        </CenteredRowContent>
      </Row>
    </Container>
  );
};

export { PortfolioHome };
