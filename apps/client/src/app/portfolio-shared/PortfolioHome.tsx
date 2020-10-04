import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import BackgroundImage from '../../assets/landscape.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { UploadBox } from '../UploadBox';
import { EditContext } from './EditContext';
import { PortfolioAvatar } from './PortfolioAvatar';
import { UserContext } from './UserContext';

const PortfolioHome = () => {
  const { name, username } = useContext(UserContext);
  const editMode = useContext(EditContext);

  return (
    <BackgroundContainer
      background={BackgroundImage}
      style={{
        backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
      }}
    >
      <Container>
        <Row>
          <CenteredRowContent>
            <PortfolioAvatar />
          </CenteredRowContent>
        </Row>
        <Row>
          <CenteredRowContent>
            <h1 className="text-white display-1 mt-5 text-center">
              {name || username}
            </h1>
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
    </BackgroundContainer>
  );
};

export { PortfolioHome };
