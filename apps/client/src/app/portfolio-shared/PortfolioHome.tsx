import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import BackgroundImage from '../../assets/landscape.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { UploadBox } from '../UploadBox';
import { EditContext } from './EditContext';
import { PortfolioAvatar } from './PortfolioAvatar';
import { UserContext } from './UserContext';
import { css } from '@emotion/core';
import { ProjectItemImage } from '../projects/editor/ProjectItemImage';

const PortfolioHome = () => {
  const { name, username } = useContext(UserContext);
  const [image, setImage] = useState('');
  const editMode = useContext(EditContext);

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  const handleImageChange = (newImage: string) => {
    setImage(newImage);
  };

  return (
    <BackgroundContainer
      background={BackgroundImage}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
      }}
    >
      <Container>
        <Row>
          <CenteredRowContent>
            {editMode ? (
              <ProjectItemImage
                image={image}
                onImageChange={handleImageChange}
              />
            ) : (
              <PortfolioAvatar />
            )}
          </CenteredRowContent>
        </Row>
        <Row>
          <CenteredRowContent>
            <h1
              className="text-white display-1 mt-5 text-center"
              css={nameStyle}
            >
              {name || username}
            </h1>
          </CenteredRowContent>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { PortfolioHome };
