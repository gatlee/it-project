import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Col, Row } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';
import { updateDescription } from '../../admin/AdminUtils';
import { UserContext } from '../UserContext';
import { BackgroundContainer } from '../../BackgroundContainer';
import BackgroundImage from '../../../assets/landscape.png';
import { HomeAvatar } from '../../homepage/HomeAvatar';
import { css } from '@emotion/core';

const About = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  const { description, setDescription, profilePicture } = useContext(
    UserContext
  );

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
    height: '100%',
  };

  const profilePictureStyle = {
    marginTop: '18%',
    '@media (max-width: 576px)': {
      marginTop: '0%',
    },
  };

  const descriptionStyle = {
    marginTop: '18%',
  };

  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => {
    setEditorOpen(false);
  };
  const handleOpenEditor = () => {
    setEditorOpen(true);
  };

  const handleSave = async (newDescription: string) => {
    setSaveButtonDisabled(true);
    try {
      await updateDescription(newDescription, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    setSaveButtonDisabled(false);
    setDescription(newDescription);
  };

  return (
    <BackgroundContainer
      background={BackgroundImage}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
      }}
    >
      <Container className="pt-5 mx-auto">
        <Row>
          <Col sm={4} xs={12} className="pr-sm-5" css={profilePictureStyle}>
            <HomeAvatar image={profilePicture} />
          </Col>
          <Col sm={8} xs={12} className="pl-sm-5" css={descriptionStyle}>
            <Container className="my-0 p-4" style={containerStyle}>
              <AboutEditor
                initialDescription={description}
                editorSaveButtonDisabled={editorSaveButtonDisabled}
                onCancel={handleCancel}
                onSave={handleSave}
                show={editorOpen}
              />
              <AboutDisplay
                description={description}
                onOpenEditor={handleOpenEditor}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { About };
