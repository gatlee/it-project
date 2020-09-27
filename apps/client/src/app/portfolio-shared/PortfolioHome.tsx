import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioAvatar } from './PortfolioAvatar';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { UploadBox } from '../UploadBox';
import { EditContext } from './EditContext';

const PortfolioHome = () => {
  const editMode = useContext(EditContext);

  return (
    <Container>
      <Row>
        <CenteredRowContent>
          <PortfolioAvatar />
        </CenteredRowContent>
      </Row>
      {editMode && (
        <Row>
          <CenteredRowContent>
            <UploadBox />
          </CenteredRowContent>
        </Row>
      )}
    </Container>
  );
};

export { PortfolioHome };
